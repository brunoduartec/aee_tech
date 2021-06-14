const makeDb = require("../db");
const makeCentroList = require("./centro-list");

const makeCentroEndpointHandler = require("./centro-endpoint");

const CentroModel = require("./centro-model");
const centroDB = makeDb(CentroModel);
const centroList = makeCentroList({
  centroDB,
});

const contactsEndpointHandler = makeCentroEndpointHandler({
  centroList,
});

module.exports = contactsEndpointHandler;
