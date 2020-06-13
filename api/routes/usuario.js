const express = require('express');
const router = express.Router();

const UserModel = require('../models/usuario');

const userModel = new UserModel();


router.post('/novo', async function (req, res) {
    let params = {
        nome: req.body.nome,
        cpf: req.body.cpf
    };

    try {
        let usersAdded = await userModel.addUser(params)
        res.json(params);
    } catch (error) {
        res.status(500).json(error)
    }

});

router.get('/', async function (req, res) {
    try {
        let users = await userModel.getUsers()
        res.json(users);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/:id', async function (req, res) {
    try {
        let id = req.params.id;
        let users = await userModel.getUserByID(id)
        res.json(users);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.put('/editar/:id', async function (req, res) {
    let params = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        id: req.params.id
    };

    try {
        await userModel.updateUser(params)
        res.json(params);
    } catch (error) {
        res.status(500).json(error)
    }

});

router.delete('/delete/:id', async function (req, res) {
    try {
        let id = req.params.id
        let userRemoved = await userModel.removeUser(id)

        if (userRemoved.affectedRows > 0) {
            res.json({
                "message": "Usuário removido"
            });
        } else {
            res.status(204).send({
                "message": "Usuario não encontrado"
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;