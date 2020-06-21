import makeCentro from './centro'
import {
    UniqueConstraintError
} from '../helper/errors'

export default function makeCentroList({
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

    async function add() {}
    async function findById() {}
    async function getItems() {}
    async function remove() {}
    async function replace() {}
    async function update() {}

}