var express = require('express');
var router = express.Router();

const middlewares = require('../../middlewares/middlewares');
const controllersBudgets = require('../controllers/controllers.budgets');

router.get('/', middlewares.validateToken, async (req, res) => {
	try {
		const budgets = await controllersBudgets.retrieveBudgets(req.params.user);
		res.status(200).json(budgets);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).send('error: ' + error.message);
	}
});

router.post('/create', middlewares.validateToken, middlewares.validateBudgetInfo, async (req, res) => {
	try {
		const ok = await controllersBudgets.createBudget(req.params.user, req.body);
		if (ok) {
			res.status(200).json(req.body);
		} else
			throw new Error('Internal error with the server, try again later');
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).send('error: ' + error.message);
	}
});


router.post('/update', middlewares.validateToken, middlewares.validateBudgetInfo, async (req, res) => {
	try {
		const ok = await controllersBudgets.modifyBudget(req.body);
		if (ok) {
			res.status(200).json(req.body);
		} else
			throw new Error('Internal error with the server, try again later');
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).send('error: ' + error.message);
	}
});

router.delete('/delete', middlewares.validateToken, async (req, res) => {
	try {
		const ok = await controllersBudgets.deleteBudget(req.body);
		if (ok) {
			res.status(200).json(req.body);
		} else
			throw new Error('Internal error with the server, try again later');
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).send('error: ' + error.message);
	}
});


module.exports = router;
