const cache = require('../model/redis/index');
const utils = require('../utils/utils');
const AppModel = require('../model/application.model')
const deepExtend = require('deep-extend');
const _ = require('underscore');

module.exports = function handleData(data, socketNsp){
    switch(data.action){
        case "query":
            //register the path if it not already registerd
            // send the data stored in given path to client
            var key = getCachePathKey(data.namespace)
            cache.set(key, {[data.path]:data.path});
            return getDataFromPath(data.namespace, data.path);
        case "post":
            //save the data to redis and trigger all save matching path and send data to client
            var paths = data.path.split('/');
            var dataObj = utils.constructionObjFromPath(_.clone(paths), data.data);
            return AppModel.get(data.namespace)
                .then((app) => {
                    app = app.toObject();
                    let updatedObj = app.data;
                    deepExtend(updatedObj, dataObj);
                    console.log('already stored data and updated data ',app.data, updatedObj);
                    AppModel.update(data.namespace, updatedObj);
                    sendDataToAllMatchingPaths(paths, updatedObj, socketNsp)
                    return AppModel.update(data.namespace, updatedObj);
                },(err) => {
                    console.log('Failed to get app data',err);
                    return Promise.reject(err);
                });
        case "unregister":
            // remove the path registration from redis
            key = getCachePathKey(data.namespace);
            return cache.remove(key, data.path);

        case "delete":
            paths = data.path.split('/');
            dataObj = utils.constructionObjFromPath(_.clone(paths), data.data);
            return AppModel.get(data.namespace)
            .then((app) => {
                app = app.toObject();
                let updatedObj = app.data;
                deepExtend(updatedObj, dataObj);
                utils.compactObject(updatedObj);
                console.log('already stored data and updated data ',app.data, updatedObj);
                AppModel.update(data.namespace, updatedObj);
                sendDataToAllMatchingPaths(paths, updatedObj, socketNsp);
                return AppModel.update(data.namespace, updatedObj);
            },(err) => {
                console.log('Failed to get app data',err);
                return Promise.reject(err);
            });  
    }
};

function getDataFromPath(namespace, path = ""){
    if(!path) return this.get(namespace);
    return AppModel.get(namespace).then((app) => {
        let paths = path.split('/');
        console.log("fetched data is ",app);
       if(app)
           return utils.getValueForObjectPath(paths, app.data);
       return {};
    },(err) => {
       Promise.reject({error: true, message:`Failed to get data for path ${path}`, trace:err}) 
    });   
}

function sendDataToAllMatchingPaths(paths=[], dataObj={}, socketNsp){
    let key = getCachePathKey(socketNsp.name.replace('/',''))
    cache.get(key).then((registeredPaths={}) => {
        if(!registeredPaths) return;
        console.log('All registered paths and incoming path',registeredPaths, paths);
        paths.reduce((prePath,currentPath) => {
            if(prePath!=currentPath){
                prePath = `${prePath}/${currentPath}`;
            }
            if(registeredPaths[prePath]){
                let pathData = utils.getValueForObjectPath(prePath.split('/'), dataObj)
                socketNsp.emit('data', {
                    data : pathData,
                    path: prePath
                });
            }
        },paths[0]);
    },(err) => {
        console.log(`Failed to get data for ${key}`);
    });
}

function getCachePathKey(namespace){
    return `${namespace}:paths`;
}