const express  = require('express');
const app = express();
const UserService = require('../services/users.service')

//getting all users
app.get('/all', async function(req, res){
    
    let users = await UserService.AllUsers()
    res.send(users);
}); 

//User Signin
app.get('/signin', async function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    console.log("password", password);
    const user = await UserService.SignIn(email, password);
    //console.log(user)
    res.send(user);
}); 

//getting a user with id
app.get('/:id', async function(req, res){
    let id = req.params.id
    let user = await UserService.GetUser(id)
    res.send(user);
}); 

//posting or creating a user
app.post('/register', async function(req, res){
    let username = req.body.username
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    
    let user = await UserService.createUser(username, password, firstname, lastname, email)
    res.send(user);
}); 
//Updating a user
app.put('/update:id', async function(req, res){
    let id = req.params.id
    let options = req.body
    
    const user = await UserService.UpdateUser(id, options);

    res.send(user);
}); 

//deleting a User
app.delete('/delete:id', async function(req, res){
    let id = req.params.id
    const user = await UserService.DeleteUser(id);
    if(user)
        res.status(200).send("deleted User successfully");
    else 
        res.status(404).send("No user found nor deleted");
}); 



module.exports = app;