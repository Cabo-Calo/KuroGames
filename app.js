
let listProducts = []

const productsDomElements = document.querySelector( '.productContainer'); //elemento padre
const inputSearch = document.getElementById('inputSearchProducts');
const categoryLinks = document.querySelectorAll('.categoryProductFilter');

categoryLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = event.target.innerText;
        const productFiltered = filterProductsCategory(category);
        renderProducts(productFiltered);
    });
});


function createProduct(product){

const newProduct = document.createElement('div');//crear elemento hijo
newProduct.setAttribute("class","productItem");

const newAnchort= document.createElement('a');
newAnchort.setAttribute("href","./productDetail.html");

const newDiv = document.createElement('div');
newDiv.setAttribute("class","nav div");

const newImg = document.createElement('img');
newImg.setAttribute("src",product.img);
newImg.setAttribute("alt",product.name);

const newPName = document.createElement('p');
newPName.setAttribute("class","product-price");
newPName.innerText= product.name;

const newPPrice = document.createElement('p');
newPPrice.setAttribute("class","product-price");
newPPrice.innerText = `precio: $${product.price}`;

const newButton = document.createElement('button');
newButton.setAttribute("class", "AddCart");
newButton.innerText = "Añadir al carrito";


newDiv.appendChild(newImg);
newDiv.appendChild(newPName);
newDiv.appendChild(newPPrice);
newDiv.appendChild(newButton)
newAnchort.appendChild(newDiv);
newProduct.appendChild(newAnchort);

return newProduct;

}

listProducts.forEach(product =>{
    const newProduct = createProduct(product);
    productsDomElements.appendChild(newProduct);
    
});

function filterProducts(text){
    const productFiltered = listProducts.filter( product => product.name.toLowerCase().includes(text.toLowerCase()));
    return productFiltered;
}

function renderProducts(products){
productsDomElements.innerHTML='';
products.forEach(product => {
    const newProduct = createProduct(product);
    productsDomElements.appendChild(newProduct);
});


}

inputSearch.addEventListener('keyup', (event) => {
    const text = event.target.value;
    const productsFiltered = filterProducts(text);
    productsDomElements.innerHTML=``;
    renderProducts(productsFiltered);
});

renderProducts(listProducts);


function filterProductsCategory(category){
    const productFiltered = listProducts.filter(product => product.category === category);
    return productFiltered;
}



const airTableToken = "patJCJ1PG3Bv2LDXV.49fd00d2b954282d2b4f5fa8c3b627b1b87fc488c5edf2270193ee677b402c46";
const baseId = "appfvcGEcP5O90leJ";
const tableName = "Products";

const airtableUrl = "https://api.airtable.com/v0/appfvcGEcP5O90leJ/Products";

async function getProductsFromAirtable() {
    try {
        const response = await fetch(airtableUrl, {
            headers: {
                'Authorization': `Bearer ${airTableToken}`,
                'Content-type': 'application/json'
            }
        });

        const data = await response.json();
        console.log('product from Airtable', data);

        listProducts = data.records.map(item => ({
            id: item.id,
            name: item.fields.Name,
            price: item.fields.Price,
            img: item.fields.Img,
            category: item.fields.Category
        }));
        renderProducts(listProducts);

    } catch (error) {
        console.error('Error fetching products from airtable', error);
    }
}

getProductsFromAirtable();

