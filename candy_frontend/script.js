window.addEventListener("DOMContentLoaded", create_form);
let addButton = document.querySelector("#addButton");
let candyname = document.querySelector("#candyName");
let candydescription = document.querySelector("#candyDescription");
let candyprice = document.querySelector("#candyPrice");
let candyquantity = document.querySelector("#candyQuantity");
let list = document.querySelector(".list");

addButton.addEventListener("click", form_submit);

async function form_submit(e) {
	try {
		e.preventDefault();
		let obj = {
			name: candyname.value,
			description: candydescription.value,
			price: candyprice.value,
			quantity: candyquantity.value,
		};
		candyname.value = candydescription.value = candyprice.value = candyquantity.value = "";
		await add_to_database(obj);
		create_form();
	} catch (error) {
		console.log(error);
	}
}

async function add_to_database(obj) {
	try {
		await axios.post("http://localhost:3000/api/v1/candy", obj);
		
	} catch (error) {
		console.log(error);
	}
}

async function create_form() {
	if (document.querySelector("ul")) {
		document.querySelector("ul").remove();
	}
	let newlist = document.createElement("ul");

	let res = await fetch_from_database();

	for (let i = 0; i < res.length; i++) {
		let listitem = document.createElement("li");
		listitem.setAttribute("id", res[i].id);
		listitem.setAttribute("quant", res[i].quantity);
		listitem.setAttribute("name", res[i].name);

		let text = document.createTextNode(`${res[i].name}  ${res[i].description}  ${res[i].price}  ${res[i].quantity}`);

		listitem.appendChild(text);
		newlist.appendChild(listitem);
		let buy1 = document.createElement("button");
		let buy2 = document.createElement("button");
		let buy3 = document.createElement("button");
		buy1.appendChild(document.createTextNode("buy one"));
		buy2.appendChild(document.createTextNode("buy two"));
		buy3.appendChild(document.createTextNode("buy three"));
		listitem.appendChild(buy1);
		listitem.appendChild(buy2);
		listitem.appendChild(buy3);
		buy1.addEventListener("click", reduce1);
		buy2.addEventListener("click", reduce2);
		buy3.addEventListener("click", reduce3);
	}
	list.appendChild(newlist);
}


async function fetch_from_database() {
	try {
		let res = await axios.get("http://localhost:3000/api/v1/candy");

		return res.data;
	} catch (error) {
		console.log("axios error");
	}
}


function reduce1(e) {
	let id = e.target.parentNode.getAttribute("id");
	let quant = e.target.parentNode.getAttribute("quant");
	let candyname = e.target.parentNode.getAttribute("name");
	quant = quant - 1;
	if (quant < 0) {
		alert(`you cannot buy more ${candyname}`);
		e.target.parentNode.remove();
		delete_database(id);
	} else {
		edit_database(id, quant);
	}
}

function reduce2(e) {
	let id = e.target.parentNode.getAttribute("id");
	let quant = e.target.parentNode.getAttribute("quant");
	let candyname = e.target.parentNode.getAttribute("name");

	quant = quant - 2;

	if (quant < 0) {
		alert(`you cannot buy more ${candyname}`);
		e.target.parentNode.remove();
		delete_database(id);
	} else {
		edit_database(id, quant);
	}
}

function reduce3(e) {
	let id = e.target.parentNode.getAttribute("id");
	let quant = e.target.parentNode.getAttribute("quant");
	let candyname = e.target.parentNode.getAttribute("name");

	quant = quant - 3;

	if (quant < 0) {
		alert(`you cannot buy more ${candyname}`);
		e.target.parentNode.remove();
		delete_database(id);
	} else {
		edit_database(id, quant);
	}
}

async function edit_database(id, quant) {
	try {
		let obj = {
			quantity: quant,
		};
		await axios.patch(`http://localhost:3000/api/v1/candy/${id}`, obj);
		console.log("obj patched");
		create_form();
	} catch (error) {
		console.log(error);
	}
}

async function delete_database(id) {
	try {
		await axios.delete(`http://localhost:3000/api/v1/candy/${id}`);
		console.log("deleted");
	} catch (error) {
		console.log(error);
	}
}
