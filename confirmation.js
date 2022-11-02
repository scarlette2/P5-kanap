/*let panier = [dataColor,dataNmb, id]
console.log(panier);
let stock = JSON.parse(localStorage.getItem("product"))

if (stock !== null) {
 stock.push(panier)
 localStorage.setItem("product", JSON.stringify(panier));      
} else {
 panier
 stock.push(panier)
 localStorage.setItem("product", JSON.stringify(panier));
}

// appeler la section items
//const containerItems = document.querySelector('#items');

// appeler l'API
const url = "http://localhost:3000/api/products/";

fetch(url)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {

  //let qty = document.querySelector(".cart__item__img")
  //qty.innerHTML = data.imageUrl
  //console.log(qty);

  //console.log(data);
  // appeler array
})
.catch(function(err) {
  // Une erreur est survenue
});



cart__items.innerHTML += `<article class="cart__item" data-id="${produits.idProduit}" data-color="${produits.colorProduits}">
<div class="cart__item__img">
  <img src="../images/product01.jpg" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>Nom du produit</h2>
    <p>${produits.colorProduits}</p>
    <p>42,00 €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;




         // localStorage.removeItem('product');
        // let deleteId = panier[i].idProduit
         //console.log(deleteId);

         //panier = panier.filter(ei => ei.idProduit !== deleteId)
         //console.log(panier);

         //localStorage.setItem("product", JSON.stringify(deleteId));
















