const Database = require('../helpers/Database')
const env = require('../env.json')

const database = new Database(env.mysql).getInstance();

module.exports = function makeDb() {
    return Object.freeze({
        add,
        findById,
        getItems,
        remove,
        replace,
        update
    })

    async function add(table, params, values) {
        let query = "INSERT INTO " + table + "(";

        for (let index = 0; index < params.length; index++) {
            const param = params[index];
            query += (param + ",")
        }

        //removes the last comma
        query = query.substring(0, query.length - 1);

        query += ") VALUES ("

        let keysToAdd = Object.keys(values)
        let valuesToAdd = Object.values(values)

        for (let index = 0; index < keysToAdd.length; index++) {
            const value = values[index];
            query += "'" + value + "',"
        }

        //removes the last comma
        query = query.substring(0, query.length - 1);

        query += ")"

        return await database.query(query);
    }
    async function findById(table, id, params) {
        let query = 'SELECT ';

        for (let index = 0; index < params.length; index++) {
            const param = params[index];
            query += (param + ",")
        }

        //removes the last comma
        query = query.substring(0, query.length - 1);

        query += (" From " + table + " WHERE id=" + id)

        return await database.query(query);
    }
    async function getItems(table, params) {
        let query = 'SELECT ';

        for (let index = 0; index < params.length; index++) {
            const param = params[index];
            query += (param + ",")
        }

        //removes the last comma
        query = query.substring(0, query.length - 1);

        query += (" From " + table)

        return await database.query(query);
    }
    async function remove(table, id) {
        let query = "DELETE FROM " + table + " WHERE id = " + id;
        return await database.query(query);
    }
    async function replace(table, id, params, values) {

    }
    async function update(table, id, params, values) {
        //TODO
        let query = "UPDATE " + table + " SET Nome = '" + params.nome + "', Regional = '" + params.regional + "'  WHERE id = " + params.id;
        return await database.query(query);
    }
}