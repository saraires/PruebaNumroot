"use strict"

const { Router } = require('express');
const { cnn_mysql } = require('../database/connection');
const { verifyToken } = require('./authMiddleware');
const router = Router();

router.get('/users', (req, res) => {
    cnn_mysql.query('SELECT * FROM Users', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Se presento un error en la base de datos");
        } else {
            return res.status(200).json(resultset);
        }
    })
});

router.post('/addUsers', async (req, res) => {
    try {
        const { document, first_name, second_name, first_surname, second_surname, phone, mail, adress, age, gender } = req.body
        const [rows] = await cnn_mysql.promise().execute(`INSERT INTO Users(document, first_name, second_name, first_surname, second_surname, phone, mail, adress, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [document, first_name, second_name, first_surname, second_surname, phone, mail, adress, age, gender]);


        if (rows.affectedRows > 0) {
            res.json({
                document: document,
                first_name: first_name,
                second_name: second_name,
                first_surname: first_surname,
                second_surname: second_surname,
                phone: phone,
                mail: mail,
                adrees: adress,
                age: age,
                gender: gender,
            })
        } else {
            console.log(e);
            res.json("No se pudo agregar la orden");
        }

    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

router.put("/editUser/:document", verifyToken, async (req, res) => {

    try {
        const { document } = req.params;
        const { firstName, secondName, firstSurname, secondSurname, phone, mail, adress, age, gender } = req.body;

        const [rows] = await cnn_mysql.promise().execute(
            `UPDATE Users SET first_name = ?, second_name = ?, first_surname = ?, second_surname = ?, phone = ?, mail = ?, adress = ?, age = ?, gender = ? WHERE document = ?`,
            [firstName, secondName, firstSurname, secondSurname, phone, mail, adress, age, gender, document]
        );

        if (rows.affectedRows > 0) {
            res.status(200).send("Usuario actualizado con éxito")
        } else {
            res.status(404).json({ message: "No pudimos actualizar el usuario" })
        }

    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "No pudimos actualizar el usuario" })
    }

});

router.delete("/deleteUser/:document", verifyToken, async (req, res) => {

    const { document } = req.params;
    try {
        const [rows] = await cnn_mysql.promise().execute(`DELETE FROM Users WHERE document = ?`, [document])

        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(204).send({message:"Usuario eliminado con exito"});
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: "No pudimos eliminar el usuario" })
    }

});

module.exports = router;