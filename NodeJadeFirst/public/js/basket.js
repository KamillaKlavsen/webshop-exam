// i parametrene skrives de ting, som skal med fra productdetail og i kurven, som her produktet og quantity
let insertProduct = (product, quantity) => {
  document.querySelector("table.shopping-cart > tbody").innerHTML += `
  <tr>
  <td>${product.Name}</td>
  <td>${product.Price}</td>
  <td><img src="/images/${product.ImageFile}" class="product-img"></td>
  <td>${quantity}</td>
  
  <td>I alt: ${quantity*product.Price}</td>`;
};
{
    /*
    <td>${quantity}</td>
<td>I alt: ${quantity * product.Price}</td>
<td><div>

    <td>${product.Name}</td>
<td>${product.Price}</td>
<td><img src="/images/${product.ImageFile}" class="product-img"></td> */}

//henter produkterne ind
let getProducts = () => {
  if (localStorage.basket) {
    let basketarr = JSON.parse(localStorage.basket);
    basketarr.forEach((item) => {
      fetch(`http://localhost:2000/product/${item.productId}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json.data);
          //definerer quantity. Dette kan gøres med andre ting f.eks. som størrelse (hvis man sælger tøj/sko)
          insertProduct(json.data, item.quantity);
        });
    });
  }
};

//Nedenstående definerer forskellige værdier i 'order'/'invoice' table i databasen. 

let onordersubmit = (e) => {
  e.preventDefault();
  let order = {
    CustomerName: e.target.CustomerName.value,
    CustomerEmail: e.target.CustomerEmail.value,
    Basketarr: localStorage.basket,
  };
  //request data 
  let reqData = {
    method: "post",
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(order),
    mode: "cors",
  };
  let req = new Request(`http://localhost:2000/order`, reqData);

  fetch(req)
    .then((response) => response.json())
    .then((json) => { //json
      //   console.log(json.data);
      console.log(req);
    });
};

document.addEventListener("DOMContentLoaded", (e) => {
  getProducts();
  document.forms.order.addEventListener("submit", onordersubmit);
});
