const { UserRepository } = require("../../Database/export_classes");

class UserService{

     static async createUser(username, password, firstame, lastname,email, is_admin){
       const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
     }

}