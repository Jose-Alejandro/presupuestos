class Session {
	constructor(token) {
		this.token = token;
	}

	static async saveSession(token) {
		sessionStorage.setItem('userSession', token);
	}

	static retrieveSession() {
		let resultado = sessionStorage.getItem('userSession');
		return resultado;
	}
}

let session = sessionStorage.getItem('userSession');
if (session != null) {
	location.href = '/';
}

let SignButton = document.getElementById('Sign_in');
SignButton.addEventListener('click', async () => {
	try {
		let form = document.forms['form_sign'];
		let response = await fetch('/users/login',
			{
				method: 'POST',
				headers: {
					"Accept": "application/json, text/plain, */*",
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'email': form['email'].value,
					'password': form['password'].value,
				})
			}
		);
		if (response.status == 200) {
			let token = await response.json();
			console.log(token);
			Session.saveSession(token);
			location.href = "/";
		} else {
			throw new Error(await response.text());
		}
	} catch (error) {
		alert(error.message);
		console.log(error.message);
	}
});

let registerButton = document.getElementById('register');
registerButton.addEventListener('click', async () => {
	location.href = "/register";
});
