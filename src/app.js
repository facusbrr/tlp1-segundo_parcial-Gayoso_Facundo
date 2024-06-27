const express = require('express');
const productos = require('./database/db.js');

//Creando el server
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());

//Rutas

//METODOS GET
app.get('/products', (req, res) => {
    res.json(productos);
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const producto = productos.find(producto => producto.id == id);
    if (!producto) {
        res.json({ error: 'El producto no se encuentra' });
    }
    res.json(producto);
});

//METODOS POST
app.post("/products", (req, res) => {
    const { name, quantity, price } = req.body;
    const id = productos.length + 1; 
    
    if (!name || !quantity || !price) return res.status(400).send("Faltan datos");

    const producto = {
        id,
        name,
        quantity: parseInt(quantity), 
        price: parseInt(price)
    };
    
    productos.push(producto);
    res.json({ message: "Producto agregado", producto });
  });
//METODOS PUT
app.put("/products/:id", (req, res) => {
    const { name, quantity, price } = req.body;
    const producto = productos.find(producto => producto.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send("Producto no encontrado");
    
    producto.name = name ?? producto.name;
    producto.quantity = quantity ? parseInt(quantity) : producto.quantity;
    producto.price = price ? parseInt(price) : producto.price;
    
    res.json({ message: "Usuario actualizado", producto });
  });
//METODOS DELETE
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const productIndex = productos.findIndex(producto => producto.id === id);
    if (productIndex === -1) return res.status(404).send("Producto no encontrado");
  
    const productoEliminado = productos.splice(productIndex, 1);
    res.json({ message: "Producto eliminado", productoEliminado});
  });
//Poniendo en escucha el servidor
app.listen(PORT, () => console.log(`Server funcionando en el puerto ${PORT}`))