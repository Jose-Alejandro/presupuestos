const modelsBudgets = require('../model/models.budgets');

module.exports.createBudget = async (user, budget) => {
	try {
		const ok = await modelsBudgets.createBudget(user, budget);
		if (ok) {
			return true;
		}
		throw new Error('An internal error has ocurred, try later');
	} catch (error) {
		throw error;
	}
};

module.exports.retrieveBudgets = async (user) => {
	try {
		const budgets = await modelsBudgets.retrieveBudgets(user);
		return budgets;
	} catch (error) {
		throw error;
	}
};

module.exports.modifyBudget = async (budget) => {
	try {
		const budgets = await modelsBudgets.modifyBudget(budget);
		return budgets;
	} catch (error) {
		throw error;
	}
};

module.exports.deleteBudget = async (budget) => {
	try {
		const budgets = await modelsBudgets.deleteBudget(budget);
		return budgets;
	} catch (error) {
		throw error;
	}
};
