//const router = require('express').Router();
const AppModel = require('../model/application.model');

module.exports = function (router) {
    router.post('/app/new', function (req, res) {
        let appData = { name: req.body.name, user: req.body.user }
        AppModel.create(appData)
            .then((app) => {
                res.send(app)
            }, (err) => {
                res.status(400).send(err);
            });
    });

    router.patch('/app/:appId', function (req, res) {
        let appData = { appId: appId, name: req.body.name }
        AppModel.rename(appData)
            .then((app) => {
                res.send(app)
            }, (err) => {
                res.status(400).send(err);
            });
    });

    router.get('/app/:userid', function (req, res) {
        AppModel.getAll(req.params.userid)
            .then((apps) => {
                res.send(apps)
            }, (err) => {
                res.status(400).send(err);
            });
    });

    router.delete('/app/:appId',function(req,res){
        AppModel.delete(req.params.appId)
            .then((data) => {
                res.send(data);
            },err => res.status(400).send(err))
    });
};