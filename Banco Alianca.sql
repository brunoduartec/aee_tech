
/************************
Cria��o Banco de Dados 
************************/

/************************
Tabela 1 - CASA 
************************/
CREATE TABLE IF NOT EXISTS aee.CENTRO ( 
ID_CENTRO INT NOT NULL AUTO_INCREMENT,
NOME_CENTRO VARCHAR(100) NOT NULL, 
CNPJ_CENTRO VARCHAR(14),
DATA_FUNDACAO DATE,
ID_REGIONAL VARCHAR(100), 
ENDERECO VARCHAR(100), 
NUMERO_ENDERECO INT, 
COMPLEMENTO VARCHAR(30), 
CEP VARCHAR(30),
BAIRRO VARCHAR(30),
CIDADE VARCHAR(50),
ESTADO VARCHAR(30),
PAIS VARCHAR(30),
ID_PRESIDENTE INT,
PRIMARY KEY (ID_CENTRO));
/************************
Tabela 1 - CASA 
************************/

/************************
Tabela 2 - REGIONAL
************************/
CREATE TABLE IF NOT EXISTS aee.REGIONAL ( 
ID_REGIONAL INT NOT NULL AUTO_INCREMENT, 
NOME_REGIONAL VARCHAR(100) NOT NULL, 
ESTADO VARCHAR(100),
PAIS VARCHAR(100),
PRIMARY KEY (ID_REGIONAL));
/************************
Tabela 2 - REGIONAL
************************/


/************************
Tabela 3 - ATIVIDADES 
************************/
CREATE TABLE IF NOT EXISTS aee.ATIVIDADES ( 
ID_ATIVIDADE INT NOT NULL AUTO_INCREMENT, 
NOME_ATIVIDADE VARCHAR(100),
PRIMARY KEY (ID_ATIVIDADE)); 
/************************
Tabela 3 - ATIVIDADES 
************************/

/************************
Tabela 4 - ATIVIDADES_CENTRO
************************/
CREATE TABLE IF NOT EXISTS aee.ATIVIDADES_CENTRO (
ID_ATIVIDADE_CENTRO INT NOT NULL AUTO_INCREMENT,
ID_CENTRO INT, 
HORINI TIME,
HORFIM TIME, 
DIA_SEMANA VARCHAR(30),
NUMERO_TURMA INT,
PRIMARY KEY (ID_ATIVIDADE_CENTRO));
/************************
Tabela 4 - ATIVIDADES_CENTRO
************************/


/************************
Tabela 5 - PESSOAS
************************/
CREATE TABLE IF NOT EXISTS aee.PESSOAS ( 
ID_PESSOA INT NOT NULL AUTO_INCREMENT,
NOME_PESSOA VARCHAR(100),
DATA_NASCIMENTO DATE,
DDD VARCHAR(3),
CELULAR VARCHAR(9),
ID_CENTRO INT,
PRIMARY KEY (ID_PESSOA));
/************************
Tabela 5 - PESSOAS
************************/