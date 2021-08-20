var express = require('express');
var router = express.Router();

const middlewares = require('../../middlewares/middlewares');
const controlersUsers = require('../controllers/controllers.Users');


router.post('/register', middlewares.validateRegisterInfo, async (req, res) => {
	try {
		const ok = await controlersUsers.registerUser(req.body);
		if (ok) {
			res.status(200).json(req.body);
		} else
			throw new Error('Internal error with the server, try again later');
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).send('error: ' + error.message);
	}
});

router.post('/login', middlewares.validateLoginInfo, async (req, res) => {
	let user = req.body;
	try {
		const ok = await controlersUsers.validateUser(user);
		let sessionToken = await controlersUsers.generateUserToken(ok);
		res.status(200).json(sessionToken);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json(error.message);
	}
});


router.get('/user', middlewares.validateToken, async (req, res) => {
	try {
		let user = await controlersUsers.retrieveUser(req.params.user);
		res.status(200).json(user);
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).json(error.message);
	}
});


router.post('/update', middlewares.validateToken, middlewares.validateRegisterInfo, async (req, res) => {
	let modifiedUser = req.body;
	try {
		let result = await controlersUsers.modifyUser(modifiedUser, req.params.user);
		if (result != undefined) {
			res.status(200).json(result);
		} else
			throw new Error('Internal error with the server, try again later');
	} catch (error) {
		console.log('error: ' + error.message);
		res.status(400).send('error: ' + error.message);
	}
});


module.exports = router;
