const Database = require('../helpers/Database')
const env = require('../env.json')

const database = new Database(env.mysql).getInstance();

async function createCentro() {

    console.log("Creating Table Centro");

    const sql = "CREATE TABLE IF NOT EXISTS Centro (\n" +
        "ID int NOT NULL AUTO_INCREMENT,\n" +
        "Nome varchar(150) NOT NULL,\n" +
        "Regional varchar(100) NOT NULL,\n" +
        "Membros int NOT NULL,\n" +
        "PRIMARY KEY (ID)\n" +
        ");";

    database.query(sql, function (error, results, fields) {
        if (error) {
            return console.log(error);
        } else {
            console.log('Tabela Criada com sucesso');
        }
    });
}

exports.bootstrap = async function () {
    await createCentro();
}