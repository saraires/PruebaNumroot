"use strict"

const { Router } = require('express');
const { cnn_mysql } = require('../database/connection');
const router = Router();
const { userValidation } = require('./validationJoi');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const claveToken = process.env.SECRET_KEY;

router.post('/register', async (req, res) => {


    // Validacion con Joi
    const { error } = userValidation.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const { user, pass } = req.body;

    try {
        // El usuario existe?
        const [rows] = await cnn_mysql.promise().execute(`SELECT * FROM Admin WHERE user = ?`, [user]);
        if (rows.length > 0) return res.status(400).send('El admin ya existe');

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(pass, salt);

        await cnn_mysql.promise().execute(`INSERT INTO Admin (user, pass) VALUES (?, ?)`, [user, hashPass]);
        res.status(200).send("Administrador registrado exitosamente");
    } catch (err) {
        res.status(400).send(err);
    };
});

router.post('/login', async (req, res) => {

    // Validacion con Joi
    const { error } = userValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { user, pass } = req.body;


    // El usuario existe?
    const [rows] = await cnn_mysql.promise().execute(`SELECT * FROM Admin WHERE user = ?`, [user]);
    const validUser = rows[0];
    if (!validUser) return res.status(400).send('El usuario o la contraseña son incorrectos');

    // La contraseña si es la correcta?
    const contraseñaValida = await bcrypt.compare(pass, validUser.pass);
    if (!contraseñaValida) return res.status(400).send('El correo o la contraseña son incorrectos');

    try {
        // Generar el JWT
        const token = jwt.sign({ id: validUser.id }, claveToken, { expiresIn: '1h' });
        res.send({ authToken: token });

    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;