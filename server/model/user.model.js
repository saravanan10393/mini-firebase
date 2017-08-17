const User = require('../db/index').User;
module.exports = {
    
    /**
     * @param {Object} userData - new user data to be created
     * @property {string} userData.email - user's email id
     * @param {string} userData.password - user's password
     * @param {Object} userData.profile - user's profile details
     * @param {string} userData.profile.firstName - user's firstName
     * @param {string} userData.profile.profileUrl - user's profiel picture
     */
    create : function(userData){
        return this.get(userData.email).then(
            (user) => {
                if(user)
                    throw new Error("User already exist");
                return undefined;
            },
            (err) => {console.log(err); throw new Error("Failed to create user")}
        )
        .then(
            (data) => {
                let user = new User(userData);
                return user.save();
            },
            (err) => {
                throw err;
            }
        );
    },

    /**
     * @param {string} userId - unique id of user
     * @param {Object} data - user's releated to be updated
     */
    updateProfile : function(userId, data){
        return User.findOneAndUpdate({_id : userId}, {$set : {profile : data}}, { new : true})
            .exec()
            .then(
                (user) => user.toObject() ,
                (err) => {
                    console.error(err);
                    return {error: "Failed to update user profile"}
                } 
            );
    },

    /**
     * @param {string} emailId
     * @returns {Promise} returns a promise that resolves to user with given id
     */
    get : function(emailId=null){
        return User.findOne({email : emailId}).exec()
            .then(
                (user) => user, 
                (err) => {
                    console.log("Failed to get user for ",emailId);
                    throw err;
                }
            );
    },

    /**
     * @param {string[]} userIds - list of userId
     * @returns {Promise} returns a promise that resolves to list all user matching id
     */
    getAll: function(userIds){
        var query = {}
	if(userIds.length > 0)
	   query = {_id : { $in : userIds}}
        
        return User.find(query, "-password").exec()
            .then(
                (users) => users, 
                (err) => {
                    console.log("Failed to get user for ", err);
                    throw err;
                }
            );
    },

    /**
     * @param {string} userId - delete the user specified by id
     * @returns {Promise} Returns a promise that resolve to confirmation of user delete action
     */
    delete : function(userId){
        return User.remove({_id : userId})
            .exec()
            .then(
                () => ({success: "user deleted successfuly"}) ,
                (err) => {
                    console.error(err);
                    return {error: "Failed to remove user"}
                } 
            );
    }
};
