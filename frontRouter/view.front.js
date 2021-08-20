var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
	res.render('index', { title: 'Presupuestos' });
});

router.get('/login', async (req, res, next) => {
	res.render('login', { title: 'Presupuestos' });
});

router.get('/register', async (req, res, next) => {
	res.render('register', { title: 'Presupuestos' });
});

router.get('/update', async (req, res, next) => {
	res.render('update', { title: 'Presupuestos' });
});

router.get('/finance', async (req, res, next) => {
	res.render('finance', { title: 'Presupuestos' });
});

module.exports = router;
