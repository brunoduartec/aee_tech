const makeCentro = require('./centro')
const {
    UniqueConstraintError
} = require('../helpers/errors')

module.exports = function makeCentroList({
    database
}) {
    return Object.freeze({
        add,
        findById,
        getItems,
        remove,
        replace,
        update
    })

    async function add({
        centroId,
        ...centro
    }) {
        return await database.add("Centro", centro)
    }
    async function findById({
        centroId
    }) {
        const params = ["ID_CENTRO", "NOME_CENTRO", "COMPLEMENTO", "BAIRRO", "CEP", "ENDERECO", "NUMERO_ENDERECO", "COMPLEMENTO", "BAIRRO", "CIDADE", "ESTADO", "PAIS", "ID_PRESIDENTE", "CNPJ_CENTRO", "DATA_FUNDACAO", "ID_REGIONAL"]
        return await database.findById("Centro", params, {
            ID_CENTRO: centroId
        })
    }
    async function getItems() {
        const params = ["ID_CENTRO", "NOME_CENTRO", "COMPLEMENTO", "BAIRRO", "CEP", "ENDERECO", "NUMERO_ENDERECO", "COMPLEMENTO", "BAIRRO", "CIDADE", "ESTADO", "PAIS", "ID_PRESIDENTE", "CNPJ_CENTRO", "DATA_FUNDACAO", "ID_REGIONAL"]
        return await database.getItems("Centro", params);
    }
    async function remove({
        centroId
    }) {
        return await database.remove("Centro", {
            ID_CENTRO: centroId
        })
    }
    async function replace({
        centroId,
        ...centro
    }) {
        return await database.replace("Centro", centro, {
            ID_CENTRO: centroId
        })
    }
    async function update({
        centroId,
        ...centro
    }) {
        return await database.update("Centro", centro, {
            ID_CENTRO: centroId
        })
    }

}