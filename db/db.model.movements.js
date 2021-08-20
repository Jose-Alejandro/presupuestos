const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');


const Movements = sequelize.define('movements',
	{
		id_budget: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		concept: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		amount: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false
		},
		month: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		timestamps: true
	});

module.exports = Movements;
