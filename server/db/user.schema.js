module.exports = function(db){
    const userSchema = new db.Schema({
        email : {type: String, required: true},
        password: {type: String, required: true},
        profile: {
            firstName : {type : String, required: true},
            profileUrl : {type : String, default: null}
        }
    });
    return userSchema;   
};