const { UserRepository } = require("../../Database/export_classes");

class UserService{

    //Create new user
    static async createUser(username, password, firstname, lastname, email){
      const user = await UserRepository.findUserByEmail(email);
      if(!user){
        return "User Already Exists"
      }
      else{
        const newuser = await UserRepository.CreateUser(username, password, firstname, lastname, email)
       return newuser;
      }
       
    }
    //Update user
    static async UpdateUser(id, options) {
        
      const user = await UserRepository.updateUser(id, options);
      if(!user) {
        return "user not found"
      }

        //console.log("service user", user);
      return user;
    }

    //Get User
    static async GetUser(id) {
        
      const user = await UserRepository.findUserById(id);
      if(!user) {
        return "user not found"
      }

        //console.log("service user", user);
      return user;
    }

    //Getting all users 
    static async AllUsers(id) {
        
      const users = await UserRepository.allUsers(id);
      if(!users) {
        return "users not found"
      }

        //console.log("service user", user);
      return users;
    }

    //Delete User
    static async DeleteUser(id){
    
      const user = await UserRepository.deleteUser(id);
      if(!user) {
        return null;
      }
      // console.log("project",projects)
      return user;
  
    }

    //Sign in
    static async SignIn(email, password) {

      const user = await UserRepository.findUserByEmail(email);

      if(!user) {
        return "Wrong Cridentials"
      }
      

    }
    
    
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }

}
module.exports = UserService;