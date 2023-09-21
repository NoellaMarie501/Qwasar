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


db.Sequelize = Sequelize;
db.sequelize = sequelize;
//calling the model functions to execute table creation
db.users = require('./user.model.js')(sequelize,DataTypes);
db.projects = require('./project.model')(sequelize,DataTypes);
//console.log("users", db.users);


//relations
db.users.hasMany(db.projects);
db.projects.belongsTo(db.users);





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


