
  
  let panier = JSON.parse(localStorage.getItem("product"))
  console.log(panier);

  ti = []
  ti = panier[0]
  console.log(ti);

  let qtyPanier = 0
  let pricePanier = 0

  function totalPrice(params) {
    pricePanier 
  }

  for (let i = 0; i < panier.length; i++){
    let produits = panier[i];

    fetch((`http://localhost:3000/api/products/${produits.idProduit}`))
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(data) {
      cart__items.innerHTML += `<article class="cart__item" data-id="${produits.idProduit}" data-color="${produits.colorProduits}">
      <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${data.name}</h2>
          <p>${produits.colorProduits}</p>
          <p>${data.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produits.qtyProduits} ">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
      </article>`; 

      console.log(data);
   
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
  }

