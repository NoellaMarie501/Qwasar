const db = require("../models/connection");

class UserRepository {

    static async CreateUser(username, password, firstame, lastname, email,is_admin) {
        const user = new db.users.create(username, password, firstame, lastname, email, is_admin);
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