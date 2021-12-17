let displayProduct = (data) => { };

let updatepage = (id) => {
    fetch(`http://localhost:2000/product/${id}`)
        .then((response) => response.json())
        .then((json) => {
            // updatelist(json.data);
            document.getElementById("content").innerHTML = `
        <div class="product-detail">
        <div>
            <img src="images/${json.data.ImageFile}" class="product-img">
            <h3 class="product-brand">${json.data.Brand}</h3> 
            <h4 class="product-name">${json.data.Name}</h4> 
            <p class="product-price">${json.data.Price}</p>
            <p class="product-desc">${json.data.Description}</p>

            


          
           </div>
           </div>
           
           
        `;
            console.log(json.data);
            document.forms.addtobasket.productId.value = json.data.ProductId;
        });
};
let onaddtobasketsubmit = (e) => {
    e.preventDefault();
    let item = {
        productId: parseInt(e.target.productId.value),
        quantity: parseInt(e.target.qty1.value)
    };
    console.log(item);
    let basketarr = [];
    if (localStorage.basket) {
        basketarr = JSON.parse(localStorage.basket);
        //finde et objekt, der har et productId i sig
        if (!basketarr.find(product => product.productId == item.productId)) {
            basketarr.push(item);
        }
    } else {
        basketarr.push(item);
    }
    localStorage.basket = JSON.stringify(basketarr);
}

document.addEventListener("DOMContentLoaded", (e) => {
    document.forms.addtobasket.addEventListener('submit', onaddtobasketsubmit);

    let event = new Event("hashchange");
    window.dispatchEvent(event);
});

window.addEventListener("hashchange", (e) => {
    let id = window.location.hash.substring(1);

    console.log(id);
    updatepage(id); //updates the id in the URL
});