const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '5.57.226.200', // Cambia esto por la IP de tu servidor MySQL
    user: 'beeltraveler',
    password: 'BeelTraveler', // Asegúrate de colocar tu contraseña aquí
    database: 'beeltraveler'
});

// Endpoint para recibir los datos
app.post('/webhook', (req, res) => {
    const dataToInsert = {
        nombre: req.body.nombre,
        email: req.body.email,
        edad: req.body.edad
    };

    connection.query('INSERT INTO tu_tabla SET ?', dataToInsert, (error) => {
        if (error) {
            console.error('Error al insertar en la base de datos:', error);
            return res.status(500).send('Error al insertar en la base de datos');
        }
        res.status(200).send('Datos recibidos e insertados correctamente');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
