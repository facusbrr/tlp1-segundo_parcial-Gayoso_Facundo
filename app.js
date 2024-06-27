const express = require('express');

//Creando el server
const app = express();
const PORT = 3000;



//Poniendo en escucha el servidor
app.listen(PORT, () => console.log(`Server funcionando en el puerto ${PORT}`))