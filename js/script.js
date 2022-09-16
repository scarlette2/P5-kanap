const url = "http://localhost:3000/api/products";
fetch(url)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
  console.log(value);
  // appeler array
})
.catch(function(err) {
  // Une erreur est survenue
});



// appeler la section items
const containerItems = document.querySelector('#items');
console.log(containerItems);

// creer une div et ses elements
let divItems = document.getElementById('items').innerHTML = "<div id='divItems' class='divItems'></div>"
console.log(divItems);
let titre = document.getElementById('divItems').innerHTML = "<h3 class='items article h3'>hello</h3>"
console.log(titre);

let id = document.getElementById('107fb5b75607497b96722bda5b504926');
console.log(id);














