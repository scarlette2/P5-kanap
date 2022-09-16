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

const img = document.createElement("img");
containerItems.appendChild(img);

const nom = document.createElement("h2");
containerItems.appendChild(nom); 

const description = document.createElement("p");
containerItems.appendChild(description);


console.log(nom);
console.log(img);
console.log(description);



















