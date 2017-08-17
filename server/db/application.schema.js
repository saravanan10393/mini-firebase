//var mongoose = require('mongoose')

module.exports = function(db){
    const applicationSchema = new db.Schema({
        name: {type: db.SchemaTypes.String, required: true},
        user:{type: db.SchemaTypes.ObjectId, ref:"User", required: true},
        data:{type: db.SchemaTypes.Mixed}
    });

    return applicationSchema;   
};