var express = require('express');
var router = express.Router();
var socket = require('../socket/socket');

require('./users')(router);
require('./application')(router);

router.post('/socket/init', function(req, res){
    let namespace = req.body.namespace;
    console.log('incoming namespace ',namespace);
    socket.initialize(namespace);
    res.sendStatus(200);
});

module.exports = router;
