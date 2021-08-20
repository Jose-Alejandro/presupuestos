
async function getITable() {
	let result = await fetch('/budgets/' + budget.id + '/ingresos',
		{
			method: 'GET',
			headers: headers
		}
	);
	res = await result.json();
	let table = document.getElementById('Itable');
	let total = 0;
	for (let i = 0; i < res.length; i++) {
		createIRow(table, res[i]);
		total += res[i].amount;
	}
	addTotalIrow(table, total);
};
getITable();

const createIRow = (table, r) => {
	let row = document.createElement('div');
	row.classList.add('row');

	let concept = document.createElement('div');
	concept.classList.add('col-2');
	concept.textContent = r.concept;

	let cantidad = document.createElement('div');
	cantidad.classList.add('col-2');
	cantidad.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(r.amount);;

	let month = document.createElement('div');
	month.classList.add('col-1');
	month.setAttribute('id', 'pr' + r.id);
	month.textContent = r.month;

	let year = document.createElement('div');
	year.classList.add('col-2');
	year.setAttribute('id', 'ver' + r.id);
	year.textContent = r.year;

	table.appendChild(row);
	row.appendChild(concept);
	row.appendChild(cantidad);
	row.appendChild(month);
	row.appendChild(year);


	let del = document.createElement('div');
	del.classList.add('col-1');
	let eliminar = document.createElement('a');
	eliminar.textContent = 'eliminar';
	eliminar.classList.add('btn');
	eliminar.classList.add('btn-outline-danger');
	eliminar.classList.add('btn-sm');
	eliminar.setAttribute("onclick", `deleteIngreso('${r.id}')`);
	row.appendChild(del);
	del.appendChild(eliminar);
};

const addTotalIrow = (table, r) => {
	let row = document.createElement('div');
	row.classList.add('row');

	let total = document.createElement('div');
	total.classList.add('text-info');
	total.classList.add('col-2');
	total.textContent = 'Total';

	let cantidad = document.createElement('div');
	cantidad.classList.add('text-info');
	cantidad.classList.add('col-2');
	cantidad.setAttribute('id', 'totalI');
	cantidad.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(r);;

	table.appendChild(row);
	row.appendChild(total);
	row.appendChild(cantidad);
	sessionStorage.setItem('resumenFinanciero', JSON.stringify({ ventas: r }));

};

let newIngresoButton = document.getElementById('addIngreso');

newIngresoButton.addEventListener('click', async () => {
	try {
		let form = document.forms['newIngreso'];
		console.log(form);
		let response = await fetch('/budgets/' + budget.id + '/createMovement',
			{
				method: 'post',
				headers: headers,
				body: JSON.stringify({
					'concept': form['concept'].value,
					'type': 'INGRESOS',
					'amount': form['amount'].value,
					'month': form['month'].value,
					'year': form['year'].value,
				})
			}
		);
		if (response.status == 200) {
			location.href = '/finance';
		} else
			throw new Error(await response.text());
	} catch (error) {
		alert(error.message);
		throw error;
	}
});

const deleteIngreso = async (id) => {
	let ok = confirm('Estas seguro?');
	if (!ok) return;
	try {
		let response = await fetch('/budgets/' + id + '/deleteMovement', {
			method: 'delete',
			headers: headers,
			body: JSON.stringify({
				"id": id
			})
		});
		if (response.status == 200) {
			location.href = '/finance';
		} else
			throw new Error(await response.text());
	} catch (error) {
		alert(error.message);
	}
};
