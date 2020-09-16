const requiredParam = require('../helpers/required-param')

const {
    InvalidPropertyError
} = require('../helpers/errors')

module.exports = function makeCentro(
    centroInfo = requiredParam('centroInfo')
) {

    validate(centroInfo)
    const normalCentro = normalize(centroInfo)
    return Object.freeze(normalCentro)

    function validate({
        NOME_CENTRO = requiredParam('NOME_CENTRO'),
        NOME_CURTO = requiredParam('NOME_CURTO'),
        CEP,
        CNPJ_CENTRO,
        ENDERECO,
        ...otherInfo
    } = {}) {
        validateName('NOME_CENTRO', NOME_CENTRO)
        validateName('NOME_CURTO', NOME_CURTO)
        validateName('CEP', CEP)
        validateName('CNPJ_CENTRO', CNPJ_CENTRO)
        validateName('ENDERECO', ENDERECO)

        return {
            NOME_CENTRO,
            NOME_CURTO,
            CEP,
            CNPJ_CENTRO,
            ENDERECO,
            ...otherInfo
        }
    }

    function validateName(label, name) {
        if (name.length < 2) {
            throw new InvalidPropertyError(`O nome ${nome} tem que ter mais de 2 caracteres`)
        }
    }

    function normalizeDate(date) {
        let charToSplit = "/"
        if (date.match(/^([0-9]*-[0-9]*-[0-9]*T[0-9]*:[0-9]*:[0-9]*.[0-9]*Z)$/)) {
            charToSplit = "-"
        }
        let dateSplited = date.split(charToSplit)

        return `${dateSplited[2]}-${dateSplited[1]}-${dateSplited[0]}`;
    }

    //metodo usado para caso queiramos deixa alguma coisa tudo minusculo por exemplo
    function normalize({
        DATA_FUNDACAO,
        ...otherInfo
    }) {
        DATA_FUNDACAO = normalizeDate(DATA_FUNDACAO)
        return {
            DATA_FUNDACAO,
            ...otherInfo
        }
    }
}