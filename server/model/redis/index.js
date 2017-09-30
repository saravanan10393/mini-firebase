const redis = require('redis');
const bluebird = require('bluebird');
const utils = require('../../utils/utils');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = redis.createClient({
   url:"redis://localhost:6379/1"
});

client.on('connect', () => {
    console.log('reist connected successfully');
});

client.on('error', (err) => {
    console.log('redis failed to connect ',err);
});

client.on('reconnecting', (data) => {
    console.log('reconnecting server in',data);
});

class RedisCache{
    set(key, data={}){
        // let dataSet = [];
        // Object.keys(data).forEach((objKey) => {
        //     let objValue = data[objKey]
        //     console.log('objeve lue ',objKey, objValue);
        //     if(typeof objValue == 'object'){
        //         objValue = JSON.stringify(objValue);
        //     }
        //     let promise = client.hmsetAsync(key, objKey, objValue)
        //         .then((data) =>{
        //             console.log('data set on redis ',key, objKey, objValue);
        //         }, (err) => {
        //             console.log(err);
        //             return Promise.reject({error: true, message:`Failed to set ${data} on key ${key}`, trace: err})
        //         });
        //     dataSet.push(promise);
        // });

        // return Promise.all(dataSet, (result) => {
        //     console.log('promise all result ',result)
        //     return result;
        // });
        return client.hmsetAsync(key, data)
            .then((data) =>{
                console.log('data set on redis ',key, data);
            }, (err) => {
                console.log(err);
                return Promise.reject({error: true, message:`Failed to set ${data} on key ${key}`, trace: err})
            });
    }

    get(key){
        return client.hgetallAsync(key)
            .then((data) => {
                console.log("retrived data for key  and value",key, data);
                return data;
            }, (err) => {
                console.log(err);
                return Promise.reject({error: true, message:`Failed to get on key ${key}`, trace: err})
            });
    }

    remove(key, path){
        return client.hdelAsync((status) => {
            return status;
        },(err) => {
            console.log(err);
            return Promise.reject({error: true, message:`Failed to delete on key ${key} and path ${path}`, trace: err})
        });
    }

    getDataFromPath(namespace, path = ""){
         if(!path) return this.get(namespace);
         return this.get(namespace).then((data) => {
             let paths = path.split('/');
             console.log("fetched data is ",data)
            if(data)
                return utils.getValueForObjectPath(paths, data);
            return {};
         },(err) => {
            Promise.reject({error: true, message:`Failed to get data for path ${path}`, trace:err}) 
         });   
    }
}

module.exports = new RedisCache();




