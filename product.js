//recuperer id depuis URL
let produit = new URL(document.location).searchParams
let id = produit.get("id")

// fetch données ID récuperer dans URL
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {

    // recupérer les élément html et insérer jes éléments de l'API correspondant 
    document.getElementsByClassName("item__img")[0].innerHTML =
      `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

    let title = document.getElementById("title");
    title.innerHTML = data.name

    let price = document.getElementById("price");
    price.innerHTML = data.price

    let description = document.getElementById("description");
    description.innerHTML = data.description

    // faire une boucle for du tableau des couleurs  et y injecter les valeurs de l'API    
    let colors = document.getElementById("colors");
    for (i = 0; i < data.colors.length; i++) {
      colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
    }

    //mettre un évènement au click pour récuperer le choix de la couleur
    let dataColor
    let qtyColor = document.getElementById('colors')
    qtyColor.addEventListener('input', (e) => {
      dataColor = (e.target.value);
    })

    //mettre un évènement au click pour récuperer le choix de la quantité
    let dataNmb
    let qtyNumber = document.querySelector(`input[type=number]`)
    qtyNumber.addEventListener('input', (e) => {
      dataNmb = (e.target.value);
    })

    //mettre un évènement au click sur le bouton pour envoyer le choix de l'utilisateur au panier et enregister dans le localstorage
    let subButton = document.getElementById("addToCart")
    subButton.addEventListener('click', (e) => {

      // conditions sur la quantité et si tout est ok renvoi vers la page panier
      if (dataNmb == undefined ||
        dataNmb < 1 ||
        dataNmb > 100 ||
        dataNmb == null ||
        dataNmb === "" ||
        dataColor == undefined ||
        dataColor == null ||
        dataColor == "") {
        alert("Veuillez sélectionner une couleur ou une quantité valide");
      } else {
        window.location.href = "./cart.html"

        // créer un objet qui sera envoyé dans le localstirage
        let produits = {
          idProduits: id,
          qtyProduits: dataNmb,
          colorProduits: dataColor,
        }
        console.log(produits);

        // faire en sorte que la variable panier parse les données de produit qui seront envoyés
        let panier = JSON.parse(localStorage.getItem("product"))

        //condition ou panier doit envoyer l'objet produit dans le localstorage
        // créer la clef "product" et y mettre les données de panier sous format JSON
        if (panier) {
          panier.push(produits)
          localStorage.setItem("product", JSON.stringify(panier));

          // instenser panier en tableau et push l´objet dans panier donc se sera un tableau d'objet
        } else {
          panier = []
          panier.push(produits)
          localStorage.setItem("product", JSON.stringify(panier));
        }
      }
    })

  })
  .catch(function (err) {
    // Une erreur est survenue
  })