const Database = require('../helpers/Database')

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = require('../env.json')[env]

const database = new Database(config.mysql).getInstance();

const fs = require('fs');
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

module.exports = async function bootstrap() {
    fs = require('fs')
    readFile('../Banco Alianca.sql')
        .then(data => {
            database.query(data)
                .then(data => {
                    console.log('Tabelas Criadas com sucesso');
                })
                .catch(error => {
                    console.log(error)
                })
        })
        .catch(err => {
            console.log(err)
        })
}