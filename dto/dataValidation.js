const Joi = require('joi');

module.exports = {
	loginModel: Joi.object().keys(
		{
			email: Joi.string().email().required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).required()
		}).with('email', 'password'),

	registerModel: Joi.object().keys(
		{
			names: Joi.string().regex(/^[a-zA-Z\s]*$/).min(4).required(),
			last_names: Joi.string().regex(/^[a-zA-Z\s]*$/).min(4).required(),
			email: Joi.string().email().required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).required()
		}).with('userName', 'password'),

	newBudget: Joi.object().keys(
		{
			id: Joi.number(),
			project: Joi.string().max(50),
			version: Joi.number(),
		}),

	newMovement: Joi.object().keys(
		{
			concept: Joi.string().min(1).max(50),
			type: Joi.string().valid('INGRESOS', 'COSTOS DIRECTOS', 'GASTOS ADMINISTRATIVOS', 'RECURSOS'),
			amount: Joi.number(),
			month: Joi.number().min(1).max(12),
			year: Joi.number().min(2000).max(2100)
		})
};
