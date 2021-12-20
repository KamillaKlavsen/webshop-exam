let insertProduct = (product, quantity) => {
    document.querySelector("table.shopping-cart > tbody").innerHTML += `
    <tr>
    <td><img src="/images/${product.ImageFile}" id="productbasket-img"></td>
    <td><div id="desc-box">
    <p class="product-brand">${product.BrandName}</p>
    <p class="product-name">${product.Name}</p>
    </div></td>
    <td class="product-qty">Antal: ${quantity}</td>
    <td class="product-price">${product.Price}</td>
    
    <td>I alt: ${quantity*product.Price}</td>
    
   `;
  };
  {
      /*
      <td>${quantity}</td>
  <td>I alt: ${quantity * product.Price}</td>
  <td><div>
  
      <td>${product.Name}</td>
  <td>${product.Price}</td>
  <td><img src="/images/${product.ImageFile}" class="product-img"></td> */}
  
  let getProducts = () => {
    if (localStorage.basket) {
      let basketarr = JSON.parse(localStorage.basket);
      basketarr.forEach((item) => {
        fetch(`http://localhost:2000/product/${item.productId}`)
          .then((response) => response.json())
          .then((json) => {
            console.log(json.data);
            insertProduct(json.data, item.quantity);
           
  
          });
      });
    }
  };
  let onordersubmit = (e) => {
    e.preventDefault();
    let order = {
      CustomerName: e.target.CustomerName.value,
      CustomerEmail: e.target.CustomerEmail.value,
      Basketarr: localStorage.basket,
    };
    let reqData = {
      method: "post",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(order),
      mode: "cors",
    };
    let req = new Request(`http://localhost:2000/order`, reqData);
  
    let clearBasket = localStorage.clear();

    fetch(req)
      .then((response) => response.json())
      .then((json) => { //json
        //   console.log(json.data);
        console.log(req);
        alert('Tak for dit køb!');
    });
    clearBasket(); //virker måske
  };
  
  document.addEventListener("DOMContentLoaded", (e) => {
    getProducts();
    document.forms.order.addEventListener("submit", onordersubmit);
    
  });
  