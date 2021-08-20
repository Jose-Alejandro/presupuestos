let session = sessionStorage.getItem('userSession');
if (session == null) {
	location.href = '/login';
}


async function getUser() {
	try {
		let response = await fetch('/users/user', {
			method: 'GET',
			headers: {
				"Accept": "application/json, text/plain, */*",
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + session
			}
		});
		if (response.status === 200) {
			let user = await response.json();
			createTable(user);
			let updatePasswordButton = document.getElementById('update');
			updatePasswordButton.addEventListener('click', async () => {
				try {
					let form = document.forms['updatePassword'];
					let password = document.getElementById('password');
					if (password.value != user.password) {
						throw new Error('Invalid current password!!');
					}
					let response = await fetch('/users/update',
						{
							method: 'POST',
							headers: {
								"Accept": "application/json, text/plain, */*",
								'Content-Type': 'application/json',
								'Authorization': 'Bearer ' + session
							},
							body: JSON.stringify({
								"names": form['names'].value,
								"last_names": form['last_names'].value,
								"email": form['email'].value,
								"password": form['newpassword'].value,
							})
						}
					);
					if (response.status == 200) {
						try {
							let response = await fetch('/users/login',
								{
									method: 'POST',
									headers: {
										"Accept": "application/json, text/plain, */*",
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										'email': form['email'].value,
										'password': form['newpassword'].value,
									})
								}
							);
							if (response.status == 200) {
								let token = await response.json();
								sessionStorage.setItem('userSession', token);
								location.href = "/";
							} else {
								throw new Error(await response.text());
							}
						} catch (error) {
							throw error;
						}
					} else {
						throw new Error(await response.text());
					}
				} catch (error) {
					alert(error.message);
					location.href = '/';
				}
			});
		} else
			throw new Error(await response.text());
	} catch (error) {
		console.log(error);
		alert(error.message);
		location.href = '/login';
	}
};


getUser();


const createTable = (user) => {
	let name = document.getElementById('names');
	name.value = user.names;
	let lastName = document.getElementById('last_names');
	lastName.value = user.last_names;
	let email = document.getElementById('email');
	email.value = user.email;
};
