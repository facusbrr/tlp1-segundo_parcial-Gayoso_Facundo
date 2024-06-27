const express = require('express');
const productos = require('./src/database/db.js');

//Creando el server
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.json());

//Rutas
app.get('/products', (req, res) => {
    res.json(productos);
});


//Poniendo en escucha el servidor
app.listen(PORT, () => console.log(`Server funcionando en el puerto ${PORT}`))