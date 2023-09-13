const db = require("../models/connection");

class UserRepository {

    static async CreateUser(username, password, firstname, lastname, email) {
        let is_admin = false;
        const user = db.users.create({username, password, firstname, lastname, email, is_admin});
        if(!user) {
            console.log("REPOSITORY no user");
        }
        else{
            console.log("REPOSITORY user: " + user);
        }
        return user;
    }

    static async UpdateUser(username, password, firstname, lastname, email) {
        
        const user = db.users.create({username, password, firstname, lastname, email, is_admin});
        if(!user) {
            console.log("REPOSITORY no user");
        }
        else{
            console.log("REPOSITORY user: " + user);
        }
        return user;
    }


}

module.exports = UserRepository;