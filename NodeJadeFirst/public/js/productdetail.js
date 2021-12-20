let displayProduct = (data) => { };

let updatepage = (id) => {
    fetch(`http://localhost:2000/product/${id}`)
        .then((response) => response.json())
        .then((json) => {
            // updatelist(json.data);
            document.getElementById("content").innerHTML = `
        <div class="product-detail">
            <div>
                <img src="images/${json.data.ImageFile}" class="productdetail-img">
            </div>

            <div class="desc-box">
                <h3 class="product-brand">${json.data.BrandName}</h3> 
                <h4 class="product-name">${json.data.Name}</h4> <br>
                <p class="product-price">${json.data.Price}</p> <br>
                <p class="product-desc">${json.data.Description}</p>
            </div>
        </div>   
        
        
    </div>
        `;
            console.log(json.data);
            document.forms.addtobasket.productId.value = json.data.ProductId;
        });
};

// funktion ved tryk på 'læg i kurv'. Event = click. Et item defineres.
let onaddtobasketsubmit = (e) => {
    e.preventDefault();
    let item = {
        productId: parseInt(e.target.productId.value),
        quantity: parseInt(e.target.qty1.value),
       
        
    };
    console.log(item);

    //Kurven er et tomt array, indtil produkterne bliver pushet til den. 
    //For at kunne se kurven i browserens console skrives der localStorage.basket, 
    //og for at rydde skrives localStorage.clear()
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