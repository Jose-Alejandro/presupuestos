const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');


const Users = sequelize.define('users',
	{
		names: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		last_names: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
		active: {
			type: DataTypes.STRING(15),
			allowNull: false
		},
	},
	{
		timestamps: true
	}
);


module.exports = Users;
