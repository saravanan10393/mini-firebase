const cache = require('../model/redis/index');
const utils = require('../utils/utils');
const AppModel = require('../model/application.model')
const deepExtend = require('deep-extend');
const _ = require('underscore');

function getCachePathKey(namespace) {
    return `${namespace}:paths`;
}

module.exports = function handleData(data, socketNsp, socketId) {
    switch (data.action) {
        case "query":
            //register the path with it's quried client if it not already registerd
            // send the data stored in given path to client
            var key = getCachePathKey(data.namespace);
            cache.get(key).then((allPaths) => {
                allPaths = allPaths || {};
                console.log('registerd socket id ',allPaths[data.path])
                let mapClients = [];
                mapClients.push(socketId);
                if(allPaths[data.path]){
                    let registeredClients = allPaths[data.path].split(',');
                    registeredClients = registeredClients.filter((clientId) => clientId != socketId);
                    mapClients = mapClients.concat(registeredClients);
                }
                cache.set(key, { [data.path]: mapClients.toString()});
            }, (err) => {
                console.warn('Faield to register the query path ', err);
            });
            return getDataFromPath(data.namespace, data.path);
        case "post":
            //save the data to redis and trigger all save matching path and send data to client
            var paths = data.path.split('/');
            var dataObj = utils.constructionObjFromPath(_.clone(paths), data.data);
            return AppModel.get(data.namespace)
                .then((app) => {
                    app = app.toObject();
                    let updatedObj = app.data || {};
                    deepExtend(updatedObj, dataObj);
                    console.log('already stored data and updated data ', app.data, updatedObj);
                    sendDataToAllMatchingPaths(paths, updatedObj, socketNsp)
                    return AppModel.update(data.namespace, updatedObj);
                }, (err) => {
                    console.log('Failed to get app data', err);
                    return Promise.reject(err);
                })
                .then((result) => {
                    return result.data ? utils.getValueForObjectPath(paths, result.data): result.data;
                }, (err) => {
                    return err;
                });
        case "unregister":
            // remove the path registration from redis
            key = getCachePathKey(data.namespace);
            cache.get(key).then(function (allPaths) {
                if (allPaths) {
                    let mapClients = allPaths[data.path].split(',');
                    mapClients.splice(mapClients.indexOf(socketId), 1);
                    cache.set(key, { [data.path]: mapClients.toString() });
                }
            }, (err) => {
                console.warn('Faield to register the query path ', err);
            });
            return cache.remove(key, data.path);
        case "unregisterClient":
            key = getCachePathKey(data.namespace);
            cache.get(key).then(function (allPaths) {
                if (allPaths) {
                    Object.keys(allPaths).forEach(function(path){
                        let mapClients = allPaths[path].split(',');
                        mapClients.splice(mapClients.indexOf(socketId), 1);
                        console.log('removed socket from list ',socketId, mapClients);
                        allPaths[path] = mapClients.toString();
                    });
                    cache.set(key, allPaths);
                }
            }, (err) => {
                console.warn('Faield to register the query path ', err);
            });
            break;
        case "delete":
            paths = data.path.split('/');
            dataObj = utils.constructionObjFromPath(_.clone(paths), data.data);
            return AppModel.get(data.namespace)
                .then((app) => {
                    app = app.toObject();
                    let updatedObj = app.data;
                    deepExtend(updatedObj, dataObj);
                    utils.compactObject(updatedObj);
                    console.log('already stored data and updated data ', app.data, updatedObj);
                    AppModel.update(data.namespace, updatedObj);
                    sendDataToAllMatchingPaths(paths, updatedObj, socketNsp);
                    return AppModel.update(data.namespace, updatedObj);
                }, (err) => {
                    console.log('Failed to get app data', err);
                    return Promise.reject(err);
                })
                .then((result) => {
                    return result.data ? utils.getValueForObjectPath(paths, result.data): result.data;
                }, (err) => {
                    return err;
                });
    }
};

function getDataFromPath(namespace, path = "") {
    if (!path) return this.get(namespace);
    return AppModel.get(namespace).then((app) => {
        let paths = path.split('/');
        console.log("fetched data is ", app);
        if (app)
            return utils.getValueForObjectPath(paths, app.data || {});
        return {};
    }, (err) => {
        Promise.reject({ error: true, message: `Failed to get data for path ${path}`, trace: err })
    });
}

function sendDataToAllMatchingPaths(paths = [], dataObj = {}, socketNsp) {
    let key = getCachePathKey(socketNsp.name.replace('/', ''))
    let pathData = utils.getValueForObjectPath([...paths], dataObj);
    console.log('mapped data for path ', paths, pathData)
    cache.get(key).then((registeredPaths = {}) => {
        if (!registeredPaths) return;
        console.log('All registered paths and incoming path', registeredPaths, paths);
        //right now traverse the path and emit the data for each path. 
        paths.reduce((prePath, currentPath) => {
            if (prePath != currentPath) {
                prePath = `${prePath}/${currentPath}`;
            }
            if (registeredPaths[prePath]) {
                //let pathData = utils.getValueForObjectPath(prePath.split('/'), dataObj);
                let registeredClients = registeredPaths[prePath].split(',');
                console.log('register all client for path ',prePath, registeredClients)
                registeredClients.forEach((socketId) => {
                    if(socketNsp.sockets[socketId]){
                        socketNsp.sockets[socketId].emit('data', {
                            data: pathData,
                            //path: prePath
                            path: paths.join('/')
                        });
                    }
                });
            }
        }, paths[0]);
    }, (err) => {
        console.log(`Failed to get data for ${key}`);
    });
}

