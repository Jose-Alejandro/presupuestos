const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

/** Test Endpoints and middlewares */
describe('Test user endpoints', () => {
	describe('When registering a new user', () => {
		it('Test for email validation', (done) => {
			chai.request(url).post('/users/register')
				.send(
					{
						"names": "alejandro",
						"last_names": "esquivel",
						"email": "alexmail.mail.com",
						"password": "pass12"
					}
				)
				.end((err, res) => {
					expect(res).to.have.status(400);
					done();
				});
		});
	});
	describe('When login with user', () => {
		it('Test for email and password', (done) => {
			chai.request(url).post('/users/login')
				.send(
					{
						"email": "alexmail@mail.com",
					}
				)
				.end((err, res) => {
					expect(res).to.have.status(400);
					done();
				});
		});
	});
	describe('When getting a user information', () => {
		it('Test valid JWT', (done) => {
			chai.request(url).get('/users/user')
				.set('Authorization', 'Bearer xxx')
				.end((err, res) => {
					expect(res).to.have.status(500);
					done();
				});
		});
	});
	describe('When updating password', () => {
		it('Test valid for name, last names, email, password and valid jwt', (done) => {
			chai.request(url).get('/users/user')
				.set('Authorization', 'Bearer xxx')
				.send({
					"names": "Alex",
					"last_names": "Esquivel",
					"email": "alexmail@mail.com",
					"password": "pass13"
				})
				.end((err, res) => {
					expect(res).to.have.status(500);
					done();
				});
		});
	});
});

describe('test budget endpoints', () => {
	describe('when creating a new budget', () => {
		it('Check for authorization', () => {
			chai.request(url).get('/budgets/create')
				.set('Authorization', 'Bearer xxx')
				.send({
					"project": "proyecto1",
					"version": "1"
				})
				.end((err, res) => {
					expect(res).to.have.status(404);
				});
		});
	});
	describe('when retrieving all budgets', () => {
		it('Check for valid JWT', () => {
			chai.request(url).get('/budgets')
				.set('Authorization', 'Bearer xxx')
				.end((err, res) => {
					expect(res).to.have.status(500);
				});
		});
	});
	describe('when updating a budgets', () => {
		it('Check for valid JWT, valid name and valid version', () => {
			chai.request(url).get('/budgets')
				.set('Authorization', 'Bearer xxx')
				.end((err, res) => {
					expect(res).to.have.status(500);
				});
		});
	});
});

describe('test movements endpoints', () => {
	describe('when creating a new movement', () => {
		it('Check for authorization and valid budget', () => {
			chai.request(url).get('/budgets/1/createMovement')
				.set('Authorization', 'Bearer xxx')
				.send({
					"concept": "Venta proyecto 1",
					"type": "INGRESOS",
					"amount": 2500,
					"month": 10,
					"year": 2021
				})
				.end((err, res) => {
					expect(res).to.have.status(404);
				});
		});
	});
	describe('when retrieving ingresos', () => {
		it('Check for auhtorization and valid budget', () => {
			chai.request(url).get('/budgets/1/ingresos')
				.set('Authorization', 'Bearer xxx')
				.end((err, res) => {
					expect(res).to.have.status(500);
				});
		});
	});
	describe('when retrieving recursos', () => {
		it('Check for auhtorization and valid budget', () => {
			chai.request(url).get('/budgets/8/recursos')
				.set('Authorization', 'Bearer xxx')
				.end((err, res) => {
					expect(res).to.have.status(500);
				});
		});
	});
});
