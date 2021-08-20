const modelsMovements = require('../model/models.movements');


module.exports.createMovements = async (movement, budget) => {
	try {
		const movements = await modelsMovements.createMovements(movement, budget);
		return movements;
	} catch (error) {
		throw error;
	}
};


module.exports.getIngresos = async (id) => {
	try {
		const movements = await modelsMovements.retrieveMovements(id, 'INGRESOS');
		return movements;
	} catch (error) {
		throw error;
	}
};

module.exports.getCostosDirectos = async (id) => {
	try {
		const movements = await modelsMovements.retrieveMovements(id, 'COSTOS DIRECTOS');
		return movements;
	} catch (error) {
		throw error;
	}
};

module.exports.getGastosAdmin = async (id) => {
	try {
		const movements = await modelsMovements.retrieveMovements(id, 'GASTOS ADMINISTRATIVOS');
		return movements;
	} catch (error) {
		throw error;
	}
};

module.exports.getRecursos = async (id) => {
	try {
		const movements = await modelsMovements.retrieveMovements(id, 'RECURSOS');
		return movements;
	} catch (error) {
		throw error;
	}
};

module.exports.modifyMovements = async (movement, budgetID) => {
	try {
		const result = await modelsMovements.modifyMovements(movement, budgetID);
		return result;
	} catch (error) {
		throw error;
	}
};

module.exports.deleteMovements = async (movement, budgetID) => {
	try {
		const result = await modelsMovements.deleteMovements(movement, budgetID);
		return result;
	} catch (error) {
		throw error;
	}
};
