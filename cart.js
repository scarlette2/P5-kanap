//récuperer les données stocké localStorage
let panier = JSON.parse(localStorage.getItem("product"))
console.log(panier);

//créer une variable total pour la quantité et total prix articles et instensier a 0
let total = 0
let totalArticle = 0

// créer une boucle for du tableau d'objet panier
for (let i = 0; i < panier.length; i++) {
  let produits = panier[i];

  // fetch l'API en y passant seulement l'ID des produits
  fetch((`http://localhost:3000/api/products/${produits.idProduits}`))
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {

      //injecter du html et y integrer les données de l'api et du tableau "panier"
      cart__items.innerHTML += `<article class="cart__item" data-id="" data-color="">
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
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produits.qtyProduits}" data-id="${produits.idProduits}" data-color="${produits.colorProduits}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${produits.idProduits}" data-color="${produits.colorProduits}">Supprimer</p>
          </div>
        </div>
      </div>
      </article>`;

      //calculer le nombre d'article et le prix total
      total += data.price * produits.qtyProduits
      totalArticle += produits.qtyProduits * 2 / 2

      //recuperer dans le dom le btn supprimer et créer un évènement au click du/des btn   
      let deleteBtns = document.getElementsByClassName("deleteItem")

      //faire une boucle des btn supprimer des articles
      for (let i = 0; i < deleteBtns.length; i++) {
        let btn = deleteBtns[i];
        btn.addEventListener('click', (event) => {

          //récuperer les dataset des btns
          let btnDatasetId = btn.dataset.id
          let btnDatasetColor = btn.dataset.color

          //boucle for du tableau d'objet panier
          for (let i = 0; i < panier.length; i++) {
            let produitPanier = panier[i];
            console.log(produitPanier);

            //condition pour la suppression des articles
            if (produitPanier.idProduits == btnDatasetId && produitPanier.colorProduits == btnDatasetColor) {
              console.log(panier);
              panier.splice(i, 1)
              console.log(panier);
              localStorage.setItem("product", JSON.stringify(panier));
              window.location.reload();
            }
          }
        })

      }

      //récuperer dans le dom le/s input de quantité
      let newQtyProduit = document.querySelectorAll(".itemQuantity")

      //faire une boucle for du tableau d'input
      for (let i = 0; i < newQtyProduit.length; i++) {

        // évènement au click sur le tableau d'input et récuperer les dataset
        newQtyProduit[i].addEventListener("click", (e) => {
          let newQtyProduitDatasetId = newQtyProduit[i].dataset.id
          let newQtyProduitDatasetColor = newQtyProduit[i].dataset.color

          //boucle du tableau d'objet panier
          for (let j = 0; j < panier.length; j++) {
            let produitPanierQty = panier[j];

            //condition pour pouvoir changer la quantité
            if (produitPanierQty.qtyProduits !== newQtyProduit[i].value && newQtyProduitDatasetId == produitPanierQty.idProduits && newQtyProduitDatasetColor == produitPanierQty.colorProduits) {
              panier[j].qtyProduits = newQtyProduit[i].value
              localStorage.setItem("product", JSON.stringify(panier));
              window.location.reload();

            }
          }
        })
      }

      //récuperer dans le dom les éléments pour afficher le prix et la quantité et y injecter les données
      let totalQty = document.querySelector("#totalQuantity");
      let totalPrice = document.querySelector("#totalPrice");

      totalQty.innerHTML = totalArticle
      totalPrice.innerHTML = total
      //-----------------------------------------------formulaire----------------------------------------------------


      //-------------------------------------recuperer dans le DOM les formulaire------------------------------------------
      let lastName = document.getElementById("lastName")
      let firstName = document.getElementById("firstName")
      let adress = document.getElementById("address")
      let city = document.getElementById("city")
      let email = document.getElementById("email")
      let submit = document.getElementById("order")

      //---------------------------------recuperer dans le DOM les balise p erreur formulaire----------------------
      let lastNameError = document.getElementById("lastNameErrorMsg")
      lastNameError.style.color = "red"
      let firstNameError = document.getElementById("firstNameErrorMsg")
      firstNameError.style.color = "red"
      let adressError = document.getElementById("addressErrorMsg")
      adressError.style.color = "red"
      let cityError = document.getElementById("cityErrorMsg")
      cityError.style.color = "red"
      let emailError = document.getElementById("emailErrorMsg")
      emailError.style.color = "red"

      //--------------------------------------récuperer données des champs input-----------------------------------------------
      let firstNameValue = ""
      let lastNameValue = ""
      let emailValue = ""
      let adressValue = ""
      let cityValue = ""

      lastName.addEventListener("input", (e) => {
        lastNameValue = e.target.value;
      })

      firstName.addEventListener("input", (e) => {
        firstNameValue = e.target.value;
      })

      email.addEventListener("input", (e) => {
        emailValue = e.target.value;
      })

      city.addEventListener("input", (e) => {
        cityValue = e.target.value;
      })

      adress.addEventListener("input", (e) => {
        adressValue = e.target.value;
      })

      submit.addEventListener("click", (e) => {
        let firstNameCheck = firstNameValue
        let lastNameCheck = lastNameValue
        let cityCheck = cityValue
        let emailCheck = emailValue
        let adresscheck = adressValue

        let firstNameCheckValidity
        let lastNameCheckValidity
        let cityCheckValidity
        let emailCheckValidity
        let adresscheckValidity

        //-----------------------------------first name regex------------------------------------------------        
        if (/^[A-Za-zèéïë]{3,20}$/.test(firstNameCheck)) {
          firstNameError.innerHTML = ``
          let firstNameStorage = localStorage.setItem("firstName", firstNameValue)
          firstNameCheckValidity = true

        } else {
          firstNameError.innerHTML = `Veuillez mettre votre prénom`
          firstNameCheckValidity = false
        }

        //-----------------------------------last name regex------------------------------------------------
        if (/^[A-Za-zèéïë]{3,20}$/.test(lastNameCheck)) {
          lastNameError.innerHTML = ``
          let lastNameStorage = localStorage.setItem("lastName", lastNameValue);
          lastNameCheckValidity = true

        } else {
          lastNameError.innerHTML = `Veuillez mettre votre nom de famille`
          lastNameCheckValidity = false
        }

        //-----------------------------------adress regex--------[0-9]{5}----------------------------------------
        if (/^[0-9]{1,4}\s[A-Za-z\s]{1,20}[A-Za-z\s]{1,5}$/.test(adresscheck)) {
          adressError.innerHTML = ``
          let adressStorage = localStorage.setItem("adress", adressValue);
          adresscheckValidity = true

        } else {
          adressError.innerHTML = `Veuillez mettre votre numéro de rue et nom de rue`
          adresscheckValidity = false
        }

        //-----------------------------------city regex------------------------------------------------
        if (/^[A-Za-zèéàí]{3,30}$/.test(cityCheck)) {
          cityError.innerHTML = ``
          let cityStorage = localStorage.setItem("city", cityValue);
          cityCheckValidity = true

        } else {
          cityError.innerHTML = `Veuillez mettre votre ville`
          cityCheckValidity = false
        }

        //-----------------------------------email regex------------------------------------------------
        if (/^[A-Za-z0-9.-_èéà]{2,50}[@]{1}[A-Za-z0-9.-_èéà]{2,50}[\.]{1}[a-z]{1,3}$/.test(emailCheck)) {
          emailError.innerHTML = ``
          let emailStorage = localStorage.setItem("email", emailValue);
          emailCheckValidity = true

        } else {
          emailError.innerHTML = `Veuillez mettre votre adresse Email`
          emailCheckValidity = false
        }

        //------------------------------verification de validité formulaire et methode POST------------------------------------------------------------------------------------------------
        if (firstNameCheckValidity == true && lastNameCheckValidity == true && cityCheckValidity == true && adresscheckValidity == true && emailCheckValidity == true) {

          //créer l'objet contact
          let contact = {
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            address: localStorage.getItem("adress"),
            city: localStorage.getItem("city"),
            email: localStorage.getItem("email"),
          }

          //créer tableau product et injecter les ID des produits
          let products = []
          products.push(produits.idProduits)
          console.log(products);

          //créer l'objet  "objetSendPost" avec comme données l'objet contact et tableau product
          let objectSendPost = {
            contact: contact,
            products: products
          }

          //methode POST pour envoyer les données du tableau "objectSendPost" au server
          let toSend = fetch(`http://localhost:3000/api/products/order`, {
            method: "POST",
            body: JSON.stringify(objectSendPost),
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          })
            .then((res) => res.json())
            .then((value) => {
              console.log("form envoye");
              let orderId = value.orderId
              console.log(value);
              console.log(orderId);

              //enleve les produits du panier
              localStorage.clear();
              //renvoi a la page confirmation
              window.location = "../html/confirmation.html?orderId=" + orderId
            })
        }
        e.preventDefault()
      })

    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}