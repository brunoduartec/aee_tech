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
        NOME_REGIONAL,
        ...centro
    }) {

        if (NOME_REGIONAL) {
            const params = ["ID_REGIONAL"]
            const idRegional = await database.findById("REGIONAL", params, {
                NOME_REGIONAL: NOME_REGIONAL
            })

            centro.ID_REGIONAL = idRegional[0].ID_REGIONAL
        }

        return await database.add("CENTRO", centro)
    }
    async function findById({
        centroId,
        max,
        searchParam,
        searchValue
    }) {
        const params = ["ID_CENTRO", "NOME_CENTRO", "NOME_CURTO", "COMPLEMENTO", "BAIRRO", "CEP", "ENDERECO", "NUMERO_ENDERECO", "COMPLEMENTO", "BAIRRO", "CIDADE", "ESTADO", "PAIS", "ID_PRESIDENTE", "CNPJ_CENTRO", "DATA_FUNDACAO", "ID_REGIONAL"]

        if (searchParam == "ID_REGIONAL") {
            const params = ["ID_REGIONAL"]
            const idRegional = await database.findById("REGIONAL", params, null, max, "NOME_REGIONAL", searchValue)

            searchValue = idRegional[0].ID_REGIONAL
        }

        return await database.findById("CENTRO", params, {
            ID_CENTRO: centroId
        }, max, searchParam, searchValue)
    }
    async function getItems({
        max
    }) {
        const params = ["ID_CENTRO", "NOME_CENTRO", "NOME_CURTO", "COMPLEMENTO", "BAIRRO", "CEP", "ENDERECO", "NUMERO_ENDERECO", "COMPLEMENTO", "BAIRRO", "CIDADE", "ESTADO", "PAIS", "ID_PRESIDENTE", "CNPJ_CENTRO", "DATA_FUNDACAO", "ID_REGIONAL"]
        return await database.getItems("CENTRO", params, max);
    }
    async function remove({
        centroId
    }) {
        return await database.remove("CENTRO", {
            ID_CENTRO: centroId
        })
    }
    async function replace({
        centroId,
        ...centro
    }) {
        return await database.replace("CENTRO", centro, {
            ID_CENTRO: centroId
        })
    }
    async function update({
        centroId,
        ...centro
    }) {
        return await database.update("CENTRO", centro, {
            ID_CENTRO: centroId
        })
    }

}