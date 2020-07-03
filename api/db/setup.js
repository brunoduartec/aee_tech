const Database = require('../helpers/Database')
const env = require('../env.json')

const database = new Database(env.mysql).getInstance();

async function createCentro() {
    console.log("Creating Table Centro");

    const sql =
        "CREATE TABLE IF NOT EXISTS CENTRO ( \n" +
        "ID_CENTRO INT NOT NULL AUTO_INCREMENT,\n" +
        "NOME_CENTRO VARCHAR(100) NOT NULL, \n" +
        "CNPJ_CENTRO VARCHAR(14),\n" +
        "DATA_FUNDACAO DATE,\n" +
        "ID_REGIONAL VARCHAR(100), \n" +
        "ENDERECO VARCHAR(100), \n" +
        "NUMERO_ENDERECO INT, \n" +
        "COMPLEMENTO VARCHAR(30), \n" +
        "CEP VARCHAR(10), \n" +
        "BAIRRO VARCHAR(30),\n" +
        "CIDADE VARCHAR(50),\n" +
        "ESTADO VARCHAR(30),\n" +
        "PAIS VARCHAR(30),\n" +
        "ID_PRESIDENTE INT,\n" +
        "PRIMARY KEY (ID_CENTRO)\n" +
        ");";

    database.query(sql, function (error, results, fields) {
        if (error) {
            return console.log(error);
        } else {
            console.log('Tabela Centro Criada com sucesso');
        }
    });
}

async function createRegional() {
    console.log("Creating Table Regional");

    const sql =
        "CREATE TABLE IF NOT EXISTS REGIONAL ( \n" +
        "ID_REGIONAL INT NOT NULL AUTO_INCREMENT, \n" +
        "NOME_REGIONAL VARCHAR(100) NOT NULL, \n" +
        "ESTADO VARCHAR(100),\n" +
        "PAIS VARCHAR(100)," +
        "PRIMARY KEY (ID_REGIONAL)\n" +
        ");";

    database.query(sql, function (error, results, fields) {
        if (error) {
            return console.log(error);
        } else {
            console.log('Tabela Regional Criada com sucesso');
        }
    });
}


exports.bootstrap = async function () {
    await createCentro();
    await createRegional();
}