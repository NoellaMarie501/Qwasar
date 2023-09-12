module.exports = (sequelize, DataTypes) => {
    const projects = sequelize.define("Projects",{
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    });
    return projects;
};



