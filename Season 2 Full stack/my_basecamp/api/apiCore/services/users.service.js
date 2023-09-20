const { UserRepository } = require("../../Database/export_classes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "My BaseCamp"

class UserService{

    //Create new user
    static async createUser(username, password, firstname, lastname, email){
      const user = await UserRepository.findUserByEmail(email);
      if(user){
        return "User Already Exists"
      }
      else{
        
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        //console.log(hashedPassword, salt);
        const newuser = await UserRepository.CreateUser(username, hashedPassword, firstname, lastname, email)
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
        
      const user = await UserRepository.findUserByIdNoPwd(id);
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

        //console.log("service user", users);
      return users;
    }

    //Delete User
    static async DeleteUser(id){
    
      const user = await UserRepository.deleteUser(id);
      if(!user) {
        return null;
      }
    
      return user;
  
    }

    //Sign in
    static async SignIn(email, password) {

  
      const user = await UserRepository.findUserByEmail(email);


      if(!user) {
        return "Wrong Email or password"
      }
     
      let matched = bcrypt.compare(password, user.password);

      if(!matched){
        return "Wrong Email or password"
      }
      //Generate a token for the user loging in using user id
      var token = jwt.sign({ id: user.id }, secret);
      
      user.dataValues.token = token;

      return user;

    }
    
    
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }
    // static async createUser(username, password, firstame, lastname,email, is_admin){
    //   const user = await UserRepository.CreateUser(username, password, firstame, lastname,email, is_admin)
    // }

}
module.exports = UserService;