const express = require('express')
const app = express();
const PORT  = 3000;
const UsersController = require('../apiCore/controllers/users.controller')
const ProjectsController = require('../apiCore/controllers/project.controller')

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use('/users', UsersController);
app.use('/projects', ProjectsController);



app.listen(PORT, ()=>{
    console.log(`listening on port = ${PORT}`);
});



module.exports = app;