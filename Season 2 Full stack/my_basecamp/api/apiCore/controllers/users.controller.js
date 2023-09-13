const express  = require('express');
const app = express();
const UserService = require('../services/users.service')


// app.get('/users:id', async function(req, res){
//     let id = req.params.id
//     let user = await UserService.createUser()
//     res.send("hello world!");
// }); 
app.post('/register', async function(req, res){
    let username = req.body.username
    let password = req.body.password
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let email = req.body.email
    
    let user = await UserService.createUser(username, password, firstname, lastname, email)
    res.send(user);
}); 

// app.get('/users:id', function(req, res){
//     let id = req.params.id

//     res.send("hello world!");
// }); 
// app.get('/users:id', function(req, res){
//     let id = req.params.id

//     res.send("hello world!");
// }); 


module.exports = app;