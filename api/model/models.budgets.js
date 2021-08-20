const budgets = require('../../db/db.model.budgets');


module.exports.createBudget = async (user, budget) => {
	budget.id_user = user.id;
	try {
		budget.active = 'true';
		await budgets.create(budget);
		return true;
	} catch (error) {
		throw error;
	}
};

module.exports.retrieveBudgets = async (user) => {
	try {
		let Budgets = await budgets.findAll({
			where: {
				active: 'true',
				id_user: user.id,
			}
		});
		if (Budgets != null) {
			return Budgets;
		}
		throw new Error('Budget no longer exists or is inactive');
	} catch (error) {
		throw error;
	}
};


module.exports.modifyBudget = async (budget) => {
	try {
		let Budgets = await budgets.update(budget, {
			where: {
				id: budget.id,
				active: 'true',
			}
		});
		if (Budgets[0]) {
			return Budgets;
		}
		throw new Error('Budget doesn\'t exists or is inactive');
	} catch (error) {
		throw error;
	}
};

module.exports.deleteBudget = async (budget) => {
	budget.active = 'false';
	try {
		let Budgets = await budgets.update(budget, {
			where: {
				id: budget.id,
				active: 'true',
			}
		});
		if (Budgets[0]) {
			return Budgets;
		}
		throw new Error('Budget doesn\'t exists or is inactive');
	} catch (error) {
		throw error;
	}
};
