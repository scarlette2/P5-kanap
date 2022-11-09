
let panier = JSON.parse(localStorage.getItem("product"))
console.log(panier);

let total = 0
let totalArticle = 0

for (let i = 0; i < panier.length; i++) {
  let produits = panier[i];
  //console.log(produits.qtyProduits);

  fetch((`http://localhost:3000/api/products/${produits.idProduits}`))
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {

      //produits.qtyProduits = parseInt(produits.qtyProduits)
      //console.log(produits.qtyProduits);


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
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produits.qtyProduits}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" data-id="${produits.idProduits}" data-color="${produits.colorProduits}">Supprimer</p>
          </div>
        </div>
      </div>
      </article>`;
      total += data.price * produits.qtyProduits
      totalArticle += produits.qtyProduits * 2 / 2
      //console.log(data);


      let deleteBtns = document.getElementsByClassName("deleteItem")
      //console.log(deleteBtns)
      for (let i = 0; i < deleteBtns.length; i++) {
        let btn = deleteBtns[i];
        //console.log(btn);
        btn.addEventListener('click', (event) => {

          let idProduct = btn.dataset.id
          let colorProduct = btn.dataset.color

          for (let i = 0; i < panier.length; i++) {
            let produiPanier = panier[i];
            console.log(produiPanier);

            if (produiPanier.idProduits == idProduct && produiPanier.colorProduits == colorProduct) {
              console.log(panier);
              panier.splice(i, 1)
              console.log(panier);
              localStorage.setItem("product", JSON.stringify(panier));
              window.location.reload();
            }
          }
        })

      }

      let totalQty = document.querySelector("#totalQuantity");
      let totalPrice = document.querySelector("#totalPrice");

      totalQty.innerHTML = totalArticle
      totalPrice.innerHTML = total

      let newQty = document.getElementsByClassName("itemQuantity")
      //console.log(newQty);

      for (let i = 0; i < newQty.length; i++) {
        /*newQty.addEventListener('input', (e) => {
          console.log(e.target.value);
        }) */
      }
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

      let lastNameData = ""
      let firstNameData = ""
      let emailData = ""
      let adressData = ""
      let cityData = ""

      lastName.addEventListener("input", (e) => {
        lastNameData = e.target.value;
        console.log(lastNameData);
      })

      firstName.addEventListener("input", (e) => {
        firstNameData = e.target.value;
        console.log(firstNameData);
      })

      email.addEventListener("input", (e) => {
        emailData = e.target.value;
        //console.log(emailData);
      })

      city.addEventListener("input", (e) => {
        cityData = e.target.value;
        //console.log(cityData);
      })

      adress.addEventListener("input", (e) => {
        adressData = e.target.value;
        //console.log(adressData);
      })

      submit.addEventListener("click", (e) => {
        let firstNameCheck = firstNameData
        let lastNameCheck = lastNameData
        let cityCheck = cityData
        let emailCheck = emailData
        let adresscheck = adressData

        let firstNameCheckValidity
        let lastNameCheckValidity
        let cityCheckValidity
        let emailCheckValidity
        let adresscheckValidity

        //-----------------------------------first name------------------------------------------------        
        if (/^[A-Za-zèéïë]{3,20}$/.test(firstNameCheck)) {
          firstNameError.innerHTML = ``
          let firstNameStorage = localStorage.setItem("firstName", firstNameData)
          firstNameCheckValidity = true

        } else {
          firstNameError.innerHTML = `Veuillez mettre votre prénom`
          firstNameCheckValidity = false
        }

        //-----------------------------------last name------------------------------------------------
        if (/^[A-Za-zèéïë]{3,20}$/.test(lastNameCheck)) {
          lastNameError.innerHTML = ``
          let lastNameStorage = localStorage.setItem("lastName", lastNameData);
          lastNameCheckValidity = true

        } else {
          lastNameError.innerHTML = `Veuillez mettre votre nom de famille`
          lastNameCheckValidity = false
        }

        //-----------------------------------adress------------------------------------------------
        if (/^[0-9]{1,4}\s[A-Za-z\s]{1,20}[A-Za-z\s]{1,5}[0-9]{5}$/.test(adresscheck)) {
          adressError.innerHTML = ``
          let adressStorage = localStorage.setItem("adress", adressData);
          adresscheckValidity = true

        } else {
          adressError.innerHTML = `Veuillez mettre votre numéro de rue ainsi que votre code postale `
          adresscheckValidity = false
        }

        //-----------------------------------city------------------------------------------------
        if (/^[A-Za-zèéàí]{3,30}$/.test(cityCheck)) {
          cityError.innerHTML = ``
          let cityStorage = localStorage.setItem("city", cityData);
          cityCheckValidity = true

        } else {
          cityError.innerHTML = `Veuillez mettre votre ville`
          cityCheckValidity = false
        }

        //-----------------------------------email------------------------------------------------
        if (/^[A-Za-z0-9.-_èéà]{2,50}[@]{1}[A-Za-z0-9.-_èéà]{2,50}[\.]{1}[a-z]{1,3}$/.test(emailCheck)) {
          emailError.innerHTML = ``
          let emailStorage = localStorage.setItem("email", emailData);
          emailCheckValidity = true

        } else {
          emailError.innerHTML = `Veuillez mettre votre adresse Email`
          emailCheckValidity = false
        }

        //------------------------------
        if (firstNameCheckValidity == true && lastNameCheckValidity == true && cityCheckValidity == true && adresscheckValidity == true && emailCheckValidity == true) {
          window.location.href = "./confirmation.html"
        }
        e.preventDefault()


      })

      //------------------------------------------ créer objet pour methode POST---------------------------------------------------------------------
      let contact = {
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        adresss: localStorage.getItem("adress"),
        city: localStorage.getItem("city"),
        email: localStorage.getItem("email"),
      }
      //console.log(contact);

      let panierId = []
      panierId.push(produits.idProduits)

      console.log(produits.idProduits);
      console.log(panierId);

      let toSend = {
        panierId,
        contact
      }

      console.log(toSend);

      let sendPost = {
        method: "POST",
        body: JSON.stringify(toSend),
        headers: { "Content-Type": "application/json" },
      };


    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}


