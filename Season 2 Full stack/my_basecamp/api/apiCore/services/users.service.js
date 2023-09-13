const { UserRepository } = require("../../Database/export_classes");

class UserService{

     static async createUser(username, password, firstname, lastname, email){
       const user = await UserRepository.CreateUser(username, password, firstname, lastname, email)
       return user;
     }
    //  static async findUser(id){
    //   const user = await UserRepository.Find(username, password, firstame, lastname,email, is_admin)
    // }
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }

}
module.exports = UserService;