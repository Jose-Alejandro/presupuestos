const users = require('../../db/db.model.users');


module.exports.RegisterUser = async (user) => {
	try {
		let exists = await users.findOne({ where: { email: user.email } });
		if (exists != null) {
			throw new Error('User already exists or it is inactive');
		} else {
			user.active = 'true';
			user.role = 'user';
			await users.create(user);
			return true;
		}
	} catch (error) {
		throw error;
	}
};

module.exports.UserExists = async (user) => {
	try {
		let exists = await users.findOne({
			where: {
				email: user.email,
				password: user.password,
				active: 'true',
			}
		});
		if (exists != null) {
			return exists;
		}
		throw new Error('user doesn\'t exists');
	} catch (error) {
		throw error;
	}
};


module.exports.retrieveUser = async (user) => {
	try {
		let User = await users.findOne({
			where: {
				email: user.email,
				password: user.password,
				active: 'true',
			}
		});
		if (User != null) {
			return User.dataValues;
		}
		throw new Error('User no longer exists or is inactive');
	} catch (error) {
		throw error;
	}
};


module.exports.modifyUser = async (user, old) => {
	try {
		let result = await users.update(user, {
			where: {
				email: old.email,
				password: old.password,
				active: 'true',
			}
		});
		if (result[0]) {
			return true;
		}
		throw new Error('User not active in database, check user data');
	} catch (error) {
		throw error;
	}
};
