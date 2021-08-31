const { DataTypes } = require('sequelize');
const sequelize = require('./db.connection');
const Movements = require('./db.model.movements');


const Budgets = sequelize.define('budgets', {
	id_user: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	project: {
		type: DataTypes.STRING(50),
		allowNull: false
	},
	version: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	active: {
		type: DataTypes.STRING(5),
		allowNull: false
	},
}, {
	timestamps: true
});

Budgets.hasMany(Movements, { foreignKey: 'id_budget' });
module.exports = Budgets;
