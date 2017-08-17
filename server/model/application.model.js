const AppModel = require('../db/index').Application;

module.exports = {
    /**
     * @param {Object} appData - data to create new application.
     * @param {string} appData.name - application name.
     * @param {string} appData.user - user id to whom this application belongs to.
     * @returns {Promise} - Returns a promise that resolves new application data
     */
    create : function(appData){
        const newApp = new AppModel(appData);
        return newApp.save().then((app) =>{
            return app;
        }, (err) => {
            console.log('err ', err);
            return {error: true, message: "Failed to create application"};
        });
    },

    get : (appId) => {
        return AppModel.findById(appId).exec()
            .then((app) => {
                return app;
            }, (err) => {
                console.log('Failed get app by id',err)
                return err;
            });
    },

    getAll : (user) => {
        return AppModel.find({user:user}).exec()
            .then((apps) => {
                return apps
            }, (err) => {
                Promise.reject(err);
            });
    },

    /**
     * @param {string} appId - Application Id to update
     * @param {string} appName - New application name to update
     * @returns {Promise} - Returns a promise that resoves to application data
     */
    rename: function(appId,appName){
        if(!appName){
            return Promise.reject({error:true, message:"Applicatio name is missing"});
        } 
        return AppModel.findByIdAndUpdate(appId, {$set:{name:appName}}, {new : true})
            .exec()
            .then(app => app, err => {
                console.log(err);
                return Promise.reject({error: true, message: "Failed update rename the app"})
            });
    },

    update: function(appId, data){
        AppModel.findByIdAndUpdate(appId, {$set:{data : data}},{new : true}).exec()
            .then(app => {
                console.log('updated the app ',app);
                return app;
            }, err => {
                console.log(err);
                return Promise.reject({error: true, message: "Failed update rename the app"})
            });     
    }
};