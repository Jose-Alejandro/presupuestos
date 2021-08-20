
let session = sessionStorage.getItem('userSession');
if (session == null) {
	location.href = '/login';
}
sessionStorage.removeItem('budget');
sessionStorage.removeItem('resumenFinanciero');
const headers = {
	"Accept": "application/json, text/plain, */*",
	'Content-Type': 'application/json',
	'Authorization': 'Bearer ' + session
};

async function getBudgetsTable() {
	let result = await fetch('/budgets',
		{
			method: 'GET',
			headers: headers
		}
	);
	res = await result.json();
	let table = document.getElementById('table');
	for (let i = 0; i < res.length; i++) {
		createRow(table, res[i]);
	}
}

getBudgetsTable();


const createRow = (table, r) => {
	let row = document.createElement('div');
	row.classList.add('row');

	let id = document.createElement('div');
	id.classList.add('col-1');
	id.textContent = r.id;

	let date = document.createElement('div');
	date.classList.add('col-2');
	date.textContent = r.createdAt;

	let project = document.createElement('input');
	project.readOnly = true;
	project.setAttribute('id', 'pr' + r.id);
	project.classList.add('col-2');
	project.value = r.project;

	let version = document.createElement('input');
	version.readOnly = true;
	version.setAttribute('id', 'ver' + r.id);
	version.classList.add('col-1');
	version.value = r.version;

	table.appendChild(row);
	row.appendChild(id);
	row.appendChild(date);
	row.appendChild(project);
	row.appendChild(version);

	let edit = document.createElement('div');
	edit.classList.add('col-1');
	let editar = document.createElement('a');
	editar.textContent = 'Editar';
	editar.classList.add('btn');
	editar.classList.add('btn-outline-warning');
	editar.classList.add('btn-sm');
	editar.setAttribute("onclick", `editBudget('${r.id}')`);
	edit.appendChild(editar);
	row.appendChild(edit);

	let del = document.createElement('div');
	del.classList.add('col-1');
	let eliminar = document.createElement('a');
	eliminar.textContent = 'eliminar';
	eliminar.classList.add('btn');
	eliminar.classList.add('btn-outline-danger');
	eliminar.classList.add('btn-sm');
	eliminar.setAttribute("onclick", `deleteBudget('${r.id}')`);
	row.appendChild(del);
	del.appendChild(eliminar);

	let acp = document.createElement('div');
	acp.classList.add('col-1');
	let aceptar = document.createElement('a');
	aceptar.textContent = 'aceptar cambios';
	aceptar.classList.add('btn');
	aceptar.classList.add('btn-outline-success');
	aceptar.classList.add('btn-sm');
	aceptar.classList.add('d-none');
	aceptar.setAttribute("id", 'ac' + r.id);
	aceptar.setAttribute("onclick", `updateBudget('${r.id}')`);
	acp.appendChild(aceptar);
	row.appendChild(acp);

	let env = document.createElement('div');
	env.classList.add('col-1');
	let enviar = document.createElement('a');
	enviar.textContent = 'enviar';
	enviar.classList.add('btn');
	enviar.classList.add('btn-outline-primary');
	enviar.classList.add('btn-sm');
	enviar.setAttribute("id", 'env' + r.id);
	enviar.setAttribute("onclick", `sendBudget('${r.id}')`);
	env.appendChild(enviar);
	row.appendChild(env);

	let fin = document.createElement('div');
	fin.classList.add('col-1');
	let finance = document.createElement('a');
	finance.textContent = 'Movimientos';
	finance.classList.add('btn');
	finance.classList.add('btn-outline-secondary');
	finance.classList.add('btn-sm');
	finance.setAttribute("id", 'env' + r.id);
	finance.setAttribute("onclick", `financeBudget('${r.id}','${r.project}')`);
	fin.appendChild(finance);
	row.appendChild(fin);
};

let newBudgetButton = document.getElementById('create');

newBudgetButton.addEventListener('click', async () => {
	try {
		let form = document.forms['newBudget'];
		let response = await fetch('/budgets/create',
			{
				method: 'post',
				headers: headers,
				body: JSON.stringify({
					'project': form['project'].value,
					'version': form['version'].value,
				})
			}
		);
		if (response.status == 200) {
			location.href = '/';
		} else
			throw new Error(await response.text());
	} catch (error) {
		alert(error.message);
		throw error;
	}
});


function editBudget(id) {
	let project = document.getElementById('pr' + id);
	let version = document.getElementById('ver' + id);
	project.readOnly = false;
	version.readOnly = false;
	let aceptar = document.getElementById('ac' + id);
	aceptar.classList.remove('d-none');
}


async function deleteBudget(id) {
	let ok = confirm('¿Estas seguro?');
	if (!ok) return;
	try {
		let response = await fetch('/budgets/delete', {
			method: 'delete',
			headers: headers,
			body: JSON.stringify({
				"id": id
			})
		});
		if (response.status == 200) {
			location.href = '/';
		} else
			throw new Error(await response.text());
	} catch (error) {
		alert(error.message);
	}
}

async function updateBudget(id) {
	try {
		let project = document.getElementById('pr' + id);
		let version = document.getElementById('ver' + id);
		console.log(project.value);
		let response = await fetch('/budgets/update', {
			method: 'post',
			headers: headers,
			body: JSON.stringify({
				"id": id,
				"project": project.value,
				"version": version.value
			})
		});
		if (response.status == 200) {
			location.href = '/';
		} else
			throw new Error(await response.text());
	} catch (error) {
		alert(error.message);
		location.href = '/';
	}
}

async function financeBudget(id, project) {
	let budget = { id: id, project: project };
	sessionStorage.setItem('budget', JSON.stringify(budget));
	location.href = '/finance';
}


async function sendBudget() {
	confirm('¿Está seguro?');
}
