const formProducto = document.getElementById('formProducto');
const nombre = document.getElementById('nombre');
const precio = document.getElementById('precio');
const categoria = document.getElementById('categoria');
const img = document.getElementById('img');

const airTableToken = "patJCJ1PG3Bv2LDXV.49fd00d2b954282d2b4f5fa8c3b627b1b87fc488c5edf2270193ee677b402c46";
const baseId = "appfvcGEcP5O90leJ";
const tableName = "Products";

const airtableUrl = "https://api.airtable.com/v0/appfvcGEcP5O90leJ/Products";

async function createProductInAirtable(product) {
    try {
        const response = await fetch(airtableUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${airTableToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                records: [
                    {
                        fields: {
                            Name: product.name,
                            Price: product.price,
                            Category: product.category,
                            Img: product.img
                        }
                    }
                ]
            })
        });

        if (!response.ok) {
            // Mostrar error HTTP
            const errorText = await response.text();
            throw new Error("HTTP " + response.status + ": " + errorText);
        }

        const data = await response.json();
        console.log("Producto creado:", data);
        return data;
    } catch (error) {
        console.error('Error CREANDO producto:', error);
        alert("Error creando producto: " + error.message);
    }
}

formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nuevoProducto = {
        name: nombre.value,
        price: Number(precio.value),
        category: categoria.value,
        img: img.value
    };

    await createProductInAirtable(nuevoProducto);
    formProducto.reset();
});
