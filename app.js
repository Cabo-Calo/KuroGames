let products = document.querySelector( '.productContainer'); //elemento padre

let newProduct = document.createElement('div');//crear elemento hijo
newProduct.setAttribute("class","productItem");

const newAnchort= document.createElement('a');
newAnchort.setAttribute("href","./productDetail.html");

const newDiv = document.createElement('div');
newDiv.setAttribute("class","nav div");

const newImg = document.createElement('img');
newImg.setAttribute("src","portadas/Silksong.jpg")
newImg.setAttribute("alt","produto 10")

newDiv.appendChild(newImg);
newAnchort.appendChild(newDiv);
newProduct.appendChild(newAnchort);


const texto = "nuevo producto" + "otro producto"
const texto2 = 'nuevo '

// agrego new contet
products.appendChild(newProduct);

const boton = document.querySelector('button');

boton.addEventListener('click', ()=>{
   alert('hiciste click en el boton');
    }
)