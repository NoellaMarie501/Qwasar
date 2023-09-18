const express = require('express')
const app = express();
const PORT  = 3001;
const UsersController = require('../apiCore/controllers/users.controller')
const ProjectsController = require('../apiCore/controllers/project.controller')
const cors = require('cors');//Cross-Origin Resource Sharing (CORS)

app.use(cors());//enabling connection from another domain or server such as the front end
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use('/users', UsersController);
app.use('/projects', ProjectsController);



app.listen(PORT, ()=>{
    console.log(`listening on port = ${PORT}`);
});



module.exports = app;