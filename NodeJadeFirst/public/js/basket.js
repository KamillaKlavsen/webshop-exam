let insertProduct = (product, quantity) => {
  document.querySelector("table.shopping-cart > tbody").innerHTML += `
  <tr>
  <td><div class="item">
  <td><div class="buttons">
  <td><span class="delete-btn"></span></td>
  <td><span class="like-btn"></span></td>
    </div></td>
</div></td>

<td><div class="image">
<img src="/images/${product.ImageFile}" class="product-img" alt="" />
    </div></td>

<td><div class="description">
   <td><span>${product.BrandName}</span></td>
   <td><span>${product.Name}</span></td>
  </div></td>

  <td><div class="quantity">
  <td><button class="plus-btn fas fa-plus" type="button" name="button">
    
  </button><td>
  <input type="text" name="name" value="1">
  <button class="minus-btn" type="button" name="button">
    <img src="minus.svg" alt="" />
  </button>
</div></td>



<td><div class="total-price">${product.Price},-</div></td>

</div></td>
</tr>`;
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
