
const url = "http://localhost:3000/api/products";

//recuperer id depuis URL
   let produit = new URL(document.location).searchParams
   let id = produit.get("id")

// fetch données ID récuperer dans URL
fetch(`http://localhost:3000/api/products/${id}`)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {
  console.log(data);

  document.getElementsByClassName("item__img")[0].innerHTML =
  `<img src="${data.imageUrl}" alt="${data.altTxt}">`;

  let title = document.getElementById("title");
  title.innerHTML = data.name

  let price = document.getElementById("price");
  price.innerHTML = data.price

  let description = document.getElementById("description");
  description.innerHTML = data.description

  let colors = document.getElementById("colors");
  for (i = 0; i < data.colors.length; i++) {
  colors.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
  }

  let dataColor
  let qtyColor = document.getElementById('colors')
  console.log(qtyColor);
  qtyColor.addEventListener('input',(e) => {
    dataColor = (e.target.value);
    console.log(dataColor);

  })

  let dataNmb
  let qtyNumber = document.querySelector(`input[type=number]`)
  console.log(qtyNumber);
  qtyNumber.addEventListener('input',(e) => {
    dataNmb = (e.target.value);
    console.log(dataNmb);
  })

  let subButton = document.getElementById("addToCart")
  console.log(subButton);
  subButton.addEventListener('click',(e) => {
    console.log(e.target.value);

    if (dataNmb == undefined||
      dataNmb < 1||
      dataNmb >100||
      dataNmb == null||
      dataNmb === ""||
      dataColor == undefined||
      dataColor == null||
      dataColor == "" ) {
      alert("Veuillez sélectionner une couleur ou une quantité valide");
    } else { 
      window.location.href ="./cart.html"
    }

    const userChoice = Object.assign({}, data, {
      color: dataColor,
      quantity : dataNmb,
    })

    console.log(userChoice);

    let productStorage = JSON.parse(localStorage.getItem('product'))
    console.log(productStorage);

    if (productStorage == null) {
      productStorage = []
      productStorage.push(userChoice)
      console.log(productStorage);
      localStorage.setItem('product', JSON.stringify(productStorage));
    }

  })
  
})
.catch(function(err) {
  // Une erreur est survenue
})