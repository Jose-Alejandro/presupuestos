
let session = sessionStorage.getItem('userSession');
if (session == null) {
	location.href = '/login';
}
const headers = {
	"Accept": "application/json, text/plain, */*",
	'Content-Type': 'application/json',
	'Authorization': 'Bearer ' + session
};
let budget = JSON.parse(sessionStorage.getItem('budget'));

let projectName = document.getElementById('projectName');
projectName.textContent = 'Proyecto: ' + budget.project;
