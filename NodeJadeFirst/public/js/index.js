  var product;
        var product_arr = [];

        const updatelist = productarr => {
            let str = '';
            product_arr[0].Name
            console.log(product_arr[0].Name);

            for (let i = 0; i < 4; i++) {
                str += 
                // `<div class="product">
                //     <div>
                //     <img src="images/${product_arr[i].ImageFile}" class="product-img">
                //     <h3 class="product-heading">${product_arr[i].Name}</h3> <br> 
                //    <p class="product-price">${product_arr[i].Price}</p> <br>
                //    <a href="/showproduct?id=${product_arr[i].ProductId}">click here</a>
                  
                //    </div>
                //    </div>`

                   `<div class="product">
                
                <a href="/productdetail.html#${product_arr[i].ProductId}">
                    
                <div >
                    <img src="images/${product_arr[i].ImageFile}" class="product-img">
                </div>
                    <div class="product-desc">
                    <h3 class="product-brand">${product_arr[i].BrandName}</h3> <br> 
                    <h4 class="product-name">${product_arr[i].Name}</h4> <br> 
                    <p class="product-price">${product_arr[i].Price}</p>
                    </div>
                   
                   </a>
                   </div>`
            ;
            console.log(product_arr[i].Name);

            }

            // productarr.forEach(product => {
            //     //adds a string to the existing string
            //     //When fetching from the database, the letters are case sensitive
            //     str += `<div class="product">
            //         <div>
            //        ${product.Name} <br> 
            //        ${product.Price} <br>
            //        ${product.ImageFile}
            //        </div>
            //        </div>`
            // });
            product.innerHTML = str;

        };

        const onproductclicked = e => {
            e.preventDefault();
            if (e.target.nodeName === 'A') {
                let id = e.target.getAttribute('href');
                console.log(id);
            }
            //get product info and display info on page
        }
        document.addEventListener('DOMContentLoaded', e => {

            product = document.getElementById('product');

            product.addEventListener('click', onproductclicked);

            fetch('http://localhost:2000/product')
                .then(response => response.json())
                .then(json => {
                    product_arr = json.data;
                    updatelist(json.data);
                })
        })