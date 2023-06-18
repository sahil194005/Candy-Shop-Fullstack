const {sequelize} = require("../db/connect");

const { Sequelize, DataTypes } = require("sequelize");

const user = sequelize.define("Candy", {
	id: {
		autoIncrement: true,
		unique: true,
		allowNull: false,
		type: DataTypes.INTEGER,
        primaryKey:true
	},
	description:{
		type: DataTypes.STRING
	},
	name: {
		type: DataTypes.STRING,
	},
	price: {
		type: DataTypes.FLOAT,
	},
	quantity: {
		type: DataTypes.INTEGER,  
	},
});

module.exports = {user};
