const requiredParam = require('../helpers/required-param')
const {
    InvalidPropertyError
} = require('../helpers/errors')

module.exports = function makeCentro(
    centroInfo = requiredParam('centroInfo')
) {

    const validCentro = validate(centroInfo)
    const normalCentro = normalize(centroInfo)
    return Object.freeze(normalCentro)

    function validate({
        nome = requiredParam('nome'),
        regional = requiredParam('regional'),
        ...otherInfo
    } = {}) {
        validateName('nome', nome)
        return {
            nome,
            regional,
            ...otherInfo
        }
    }

    function validateName(label, name) {
        if (name.length < 2) {
            throw new InvalidPropertyError(`O nome ${nome} tem que ter mais de 2 caracteres`)
        }
    }

    function normalize({
        nome,
        regional,
        ...otherInfo
    }) {
        return {
            nome,
            regional,
            ...otherInfo
        }
    }
}