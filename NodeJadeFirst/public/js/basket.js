let insertProduct = (product, quantity) => {
document.querySelector('table.shopping-cart > tbody').innerHTML += `
<tr>
<td>${product.Name}</td>
<td>${product.Price}</td>
<td><img src="/images/${product.ImageFile}" class="product-img"></td>
<td>${quantity}</td>
<td>I alt: ${quantity*product.Price}</td>

</tr>`

}

let getProducts = () => {
    if(localStorage.basket){
        let basketarr = JSON.parse(localStorage.basket);
        basketarr.forEach(item => {
            
            fetch(`http://localhost:2000/product/${item.productId}`)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json.data)
                    insertProduct(json.data, item.quantity);
            });
        })
    }
}
let onordersubmit = (e) => {
    e.preventDefault();
    let order = {
        CustomerName: e.target.CustomerName.value,
        CustomerEmail: e.target.CustomerEmail.value,
        Basketarr: localStorage.basket
    }
    let reqData = {
        method: 'post',
        body: JSON.stringify(order),
        mode: 'cors'
    }
    let req = new Request(`http://localhost:2000/order`, reqData);

    fetch(req)
    .then((response) => response.json())
    .then((json) => {
        // console.log(json.data)
        console.log(req)
});
}

document.addEventListener('DOMContentLoaded', e => {
    getProducts();
    document.forms.order.addEventListener('submit', onordersubmit)
});

