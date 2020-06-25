const Database = require('../helpers/Database')
const env = require('../env.json')

const database = new Database(env.mysql).getInstance();

const setup = require('./setup')
exports.setup = setup.bootstrap

module.exports = function makeDb() {
    return Object.freeze({
        add,
        findById,
        getItems,
        remove,
        replace,
        update
    })

    async function add(table, values) {
        let keysToAdd = Object.keys(values)
        let valuesToAdd = Object.values(values)

        let query = "INSERT INTO " + table + "(";

        for (let index = 0; index < keysToAdd.length; index++) {
            const param = keysToAdd[index];
            query += (param + ",")
        }

        //removes the last comma
        query = query.substring(0, query.length - 1);

        query += ") VALUES ("

        for (let index = 0; index < valuesToAdd.length; index++) {
            const value = valuesToAdd[index];
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
        await remove(table, id)
        await add(table, values)
    }
    async function update(table, id, values) {
        let keysToAdd = Object.keys(values)
        let valuesToAdd = Object.values(values)

        let query = "UPDATE " + table + " SET";

        for (let index = 0; index < keysToAdd.length; index++) {
            const param = keysToAdd[index];
            const value = valuesToAdd[index];

            query += (" " + param + " = '" + value + "',")
        }

        //removes the last comma
        query = query.substring(0, query.length - 1);

        query += ("  WHERE id = " + id);
        return await database.query(query);
    }
}