let exitButton = document.getElementById('exit');
exitButton.addEventListener('click', async () => {
	sessionStorage.clear();
	location.href = '/';
});
let changePassButton = document.getElementById('changepass');
changePassButton.addEventListener('click', async () => {
	location.href = '/update';
});
