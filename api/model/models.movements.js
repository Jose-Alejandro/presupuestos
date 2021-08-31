const Movements = require('../../db/db.model.movements');


module.exports.createMovements = async (movement, budget) => {
	try {
		movement.id_budget = budget.id;
		await Movements.create(movement);
		return true;
	} catch (error) {
		throw error;
	}
};

module.exports.retrieveMovements = async (budgetID, type) => {
	try {
		let movements = await Movements.findAll({
			where: {
				id_budget: budgetID,
				type: type
			}
		});
		if (movements) {
			return movements;
		}
		throw new Error('no movements exists: ' + type);
	} catch (error) {
		throw error;
	}
};


module.exports.modifyMovements = async (movement, budgetID) => {
	try {
		let result = await Movements.update(movement, {
			where: {
				id: movement.id,
				id_budget: budgetID,
				type: movement.type
			}
		});
		if (result[0]) {
			return result;
		}
		throw new Error('no valid movement!');
	} catch (error) {
		throw error;
	}
};

module.exports.deleteMovements = async (movement) => {
	try {
		let result = await Movements.destroy({
			where: {
				id: movement.id
			}
		});
		if (result) {
			return result;
		}
	} catch (error) {
		throw error;
	}
};
