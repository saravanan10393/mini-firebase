const mongoose = require('mongoose');

mongoose.connect("mongodb://mongo:27017/kfbase", function(err){
    if(err)
        console.log("Failed to connect to mongo db ",err);
    else
        console.log("mongo connected successfully")
});

module.exports = {
    User : mongoose.model('User', require('./user.schema')(mongoose)),
    Application: mongoose.model('Application', require('./application.schema')(mongoose))
};

// @ts-ignore
mongoose.Promise = Promise;