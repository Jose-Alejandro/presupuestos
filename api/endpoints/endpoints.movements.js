var express = require('express');
var router = express.Router();

const middlewares = require('../../middlewares/middlewares');
const controllersMovements = require('../controllers/controllers.movements');

router.post('/:id/createMovement', middlewares.validateToken, middlewares.validateMovementInfo, async (req, res) => {
	let budgetID = { id: req.params.id };
	let movement = req.body;
	try {
		const movements = await controllersMovements.createMovements(movement, budgetID);
		res.status(200).json(movements);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json('error: ' + error.message);
	}
});

router.get('/:id/ingresos', middlewares.validateToken, async (req, res) => {
	let budgetID = req.params.id;
	try {
		const ingresos = await controllersMovements.getIngresos(budgetID);
		res.status(200).json(ingresos);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json('error: ' + error.message);
	}
});


router.get('/:id/costosDirectos', middlewares.validateToken, async (req, res) => {
	let budgetID = req.params.id;
	try {
		const costosD = await controllersMovements.getCostosDirectos(budgetID);
		res.status(200).json(costosD);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json('error: ' + error.message);
	}
});

router.get('/:id/gastosAdmin', middlewares.validateToken, async (req, res) => {
	let budgetID = req.params.id;
	try {
		const costosD = await controllersMovements.getGastosAdmin(budgetID);
		res.status(200).json(costosD);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json('error: ' + error.message);
	}
});

router.get('/:id/recursos', middlewares.validateToken, async (req, res) => {
	let budgetID = req.params.id;
	try {
		const costosD = await controllersMovements.getRecursos(budgetID);
		res.status(200).json(costosD);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json('error: ' + error.message);
	}
});

router.post('/:id/modifyMovement', middlewares.validateToken, async (req, res) => {
	let budgetID = req.params.id;
	try {
		const result = await controllersMovements.modifyMovements(req.body, budgetID);
		res.status(200).json(req.body);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json('error: ' + error.message);
	}
});

router.delete('/:id/deleteMovement', middlewares.validateToken, async (req, res) => {
	let budgetID = req.params.id;
	try {
		const ok = await controllersMovements.deleteMovements(req.body, budgetID);
		if (ok) {
			res.status(200).json("Succesful operation, movement deleted!");
			return;
		}
		throw new Error("An error occurred, or movement already deleted!");
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json('error: ' + error.message);
	}
});


module.exports = router;
