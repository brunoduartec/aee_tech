CREATE TABLE IF NOT EXISTS aee.CENTRO ( ID_CENTRO INT NOT NULL AUTO_INCREMENT, NOME_CENTRO VARCHAR(100) NOT NULL, NOME_CURTO VARCHAR(50) NOT NULL, CNPJ_CENTRO VARCHAR(20), DATA_FUNDACAO DATE, ID_REGIONAL VARCHAR(100), ENDERECO VARCHAR(100), NUMERO_ENDERECO INT, COMPLEMENTO VARCHAR(30), CEP VARCHAR(30), BAIRRO VARCHAR(30), CIDADE VARCHAR(50), ESTADO VARCHAR(30), PAIS VARCHAR(30), ID_PRESIDENTE INT, PRIMARY KEY (ID_CENTRO) );
CREATE TABLE IF NOT EXISTS aee.REGIONAL ( ID_REGIONAL INT NOT NULL AUTO_INCREMENT, NOME_REGIONAL VARCHAR(100) NOT NULL, ESTADO VARCHAR(100), PAIS VARCHAR(100), PRIMARY KEY (ID_REGIONAL) );