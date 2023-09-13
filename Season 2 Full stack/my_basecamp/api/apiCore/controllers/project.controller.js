const express  = require('express');
const app = express();
const ProjectService = require('../services/projects.service')


// app.get('/Projects:id', async function(req, res){
//     let id = req.params.id
//     let Project = await ProjectService.createProject()
//     res.send("hello world!");
// }); 
app.post('/new_project', async function(req, res){
    let name = req.body.name
    let description = req.body.description
    
    
    let Project = await ProjectService.createProject(name, description)
    res.send(Project);
}); 

// app.get('/Projects:id', function(req, res){
//     let id = req.params.id

//     res.send("hello world!");
// }); 
// app.get('/Projects:id', function(req, res){
//     let id = req.params.id

//     res.send("hello world!");
// }); 


module.exports = app;