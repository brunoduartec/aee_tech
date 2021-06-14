const makeDb = require("../db");
const makeRegionalList = require("./regional-list");
const makeRegionalEndpointHandler = require("./regional-endpoint");

const RegionalModel = require("./regional-model");
const database = makeDb(RegionalModel);
const regionalList = makeRegionalList({
  database,
});
const contactsEndpointHandler = makeRegionalEndpointHandler({
  regionalList,
});

module.exports = contactsEndpointHandler;
