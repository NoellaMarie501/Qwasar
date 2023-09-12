const { Sequelize, DataTypes } = require('sequelize');
const db = {};

const sequelize = new Sequelize(
    "my_basecamp",//db name
    "root",//db username
    "",
    {
        host: "localhost",
        dialect: "mysql"
    }
);
//calling the model functions to execute table creation
db.users = require('./user.model')(sequelize,DataTypes);
db.projects = require('./project.model')(sequelize,DataTypes);
//console.log("users", db.users);


//table relations
db.projects.belongsTo(db.users, {foreignKey: "user_id"});
























//checking if database can connect
sequelize
  .authenticate()
  .then(() => {
    console.log("== Data Base connection successfull===");
  })
  .catch((err) => {
        console.log(
        "===Error in Data Base connection : " +
            err +
            " ===="
        );
    });

//connecting to database
sequelize.sync()
.then(() =>{
    console.log("== Data Base synchronised===");
})
.catch((err) => {
    console.log("===Error in Data Base synchronisation): " +
    err +
    " ====");
});

module.exports = db;


