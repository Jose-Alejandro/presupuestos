
let session = sessionStorage.getItem('userSession');
if (session != null) {
	location.href = '/';
}

let registerButton = document.getElementById('register');
registerButton.addEventListener('click', async () => {
	try {
		let form = document.forms['formRegister'];
		let response = await fetch('/users/register',
			{
				method: 'post',
				headers: {
					"Accept": "application/json, text/plain, */*",
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"names": form['names'].value,
					"last_names": form['last_names'].value,
					"email": form['email'].value,
					"password": form['password'].value,
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
							'password': form['password'].value,
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
