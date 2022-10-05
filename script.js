
// appeler la section items
const containerItems = document.querySelector('#items');

const url = "http://localhost:3000/api/products";

fetch(url)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {

  for (let i = 0; i < data.length; i++){
    let kanap = data[i];
    containerItems.innerHTML += `<a href="./product.html?id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}"> 
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
  </a>`;
  }
  console.log(data);
  // appeler array
})
.catch(function(err) {
  // Une erreur est survenue
});


















