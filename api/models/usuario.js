const Database = require('../helper/Database');

const database = new Database().getInstance();

module.exports = class UserModel {

    async getUsers() {
        return await database.query('SELECT * FROM User');
    }

    async getUserByID(id) {
        return await database.query('SELECT * FROM User WHERE id = ' + id);
    }

    async addUser(params) {
        let query = "INSERT INTO User (Nome, CPF) VALUES ('" + params.nome + "','" + params.cpf + "')";
        return await database.query(query);
    }

    async removeUser(id) {
        let query = "DELETE FROM User WHERE id = " + id;
        return await database.query(query);
    }

    async updateUser(params) {
        let query = "UPDATE User SET Nome = '" + params.nome + "', CPF = '" + params.cpf + "'  WHERE id = " + params.id;
        return await database.query(query);
    }
}