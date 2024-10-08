"use strict"

const express = require('express');
const cors = require('cors');
const app = express();

const users = require('./controllers/controllUser');
const admin = require('./controllers/loging');

// Middlewares Configuration
app.use(cors());
app.use(express.json());
require('dotenv').config();

// User Form Routes
app.use('/', users);
app.use('/api/admin', admin)

// Server is up
app.set('port', process.env.port || 4000);

app.listen(app.get('port'), () => {
    console.log(`Aplicación corriendo en el puerto ${app.get('port')}!!`);
});

module.exports = app;