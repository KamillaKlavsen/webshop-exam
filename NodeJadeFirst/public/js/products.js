var content;
var product;
var productinfo;
var product_arr = [];

//fetch request a new page (kinda like routing)
const updatepage = (page) => {
  fetch(`http://localhost:2000/product?page=${page}`)
    .then((response) => response.json())
    .then((json) => {
      product_arr = json.data;
      updatelist(json.data);
    });
};

const updatelist = (productarr) => {
  let str = "";
           productarr.forEach(product => {
                //adds a string to the existing string
                //When fetching from the database, the letters are case sensitive
                str += `<div class="product">
                
                <a href="/productdetail.html#${product.ProductId}">
                    
                <div >
                    <img src="images/${product.ImageFile}" class="productpage-img">
                </div>
                    <div class="product-desc">
                    <h3 class="product-brand">${product.BrandName}</h3> <br> 
                    <h4 class="product-name">${product.Name}</h4> <br> 
                    <p class="product-price">${product.Price}</p>
                    </div>
                   
                   </a>
                   </div>`
            });
            product.innerHTML = str;

        };

const getproduct = (id) => {
  let product = `product${id}`;
  fetch(product)
    .then((response) => response.json())
    .then((json) => {
      productinfo.innerHTML = `name:${product.name} is ${product.price}`;
    });
};

const onproductclicked = (e) => {
  e.preventDefault();
  if (e.target.nodeName === "A") {
    let id = e.target.getAttribute("href");
    console.log(id);
  }
};

document.addEventListener("DOMContentLoaded", (e) => {
  content = document.getElementById("content");
  product = document.getElementById("product");

  console.log(content);

  let event = new Event("hashchange");
  window.dispatchEvent(event);

});

window.addEventListener("hashchange", (e) => {
  let page = window.location.hash.substring(1);
  page = page.length > 0 ? page : 1; //
  updatepage(page); //updates the id in the URL
});
