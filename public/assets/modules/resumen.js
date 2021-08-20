
setTimeout(() => {
	let r = JSON.parse(sessionStorage.getItem('resumenFinanciero'));

	let ventas = document.getElementById('ventas');
	ventas.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(r.ventas);

	let costos = document.getElementById('costos');
	costos.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(r.costos);;

	let marg = r.ventas - r.costos;
	let margP = marg / r.ventas;

	let margen = document.getElementById('margen');
	margen.classList.add('text-success');
	if (marg < 0) {
	}
	margen.textContent = Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(marg);;

	let margenP = document.getElementById('margenP');
	margenP.classList.add('text-success');
	if (margP < 0) {
		margenP.classList.add('text-danger');
	}
	margenP.textContent = Intl.NumberFormat('en-EN', { style: "percent", maximumFractionDigits: 0, }).format(margP);;

}, 100);
