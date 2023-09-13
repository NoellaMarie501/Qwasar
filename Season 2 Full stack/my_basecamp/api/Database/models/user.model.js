module.exports = (sequelize,DataTypes) =>{
    const users = sequelize.define("Users",{
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstname:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin : {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    });
    return users;
}

