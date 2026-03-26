function login(){

let user = document.getElementById("username").value
let pass = document.getElementById("password").value

if(user === "admin" && pass === "1234"){
window.location = "index.html"
}
else{
alert("Invalid login")
}

}

function searchOrders() {

let input = document.getElementById("searchOrders");
let filter = input.value.toLowerCase();
let table = document.getElementById("ordersTable");
let tr = table.getElementsByTagName("tr");

for (let i = 1; i < tr.length; i++) {

let rowText = tr[i].textContent.toLowerCase();

if (rowText.includes(filter)) {
tr[i].style.display = "";
} else {
tr[i].style.display = "none";
}

}

}