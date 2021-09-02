const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');
const Budgets = require('./db.model.budgets');


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
			type: DataTypes.STRING(),
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


Users.hasMany(Budgets, { foreignKey: 'id_user' });
module.exports = Users;
