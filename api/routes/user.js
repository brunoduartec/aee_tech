const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/novo', function (req, res) {
    const novoUser = new User({
        nome: req.body.nome,
        centro: req.body.centro,
        telefone: req.body.telefone,
        aniversario: req.body.aniversario

    });

    novoUser
        .save()
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.get('/', function (req, res) {
    User.find()
        .then(user => {
            res.json(user)
        })
        .catch(error => res.status(500).json(error));
});

router.put('/editar/:id', function (req, res) {
    const body = req.body

    User.findByIdAndUpdate({
            _id: req.params.id
        }, body, {
            new: true
        })
        .then(user => {
            res.json(user)
        })
        .catch(error => res.status(500).json(error))
});

router.delete('/delete/:id', function (req, res) {
    User.findByIdAndDelete({
            _id: req.params.id
        })
        .then(user => {
            res.json(user)
        })
        .catch(error => res.status(500).json(error))
})

module.exports = router;