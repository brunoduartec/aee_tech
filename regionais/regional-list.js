const makeRegional = require("./regional");
const { UniqueConstraintError } = require("../helpers/errors");

module.exports = function makeRegionalList({ database }) {
  return Object.freeze({
    add,
    findById,
    getItems,
    remove,
    replace,
    update,
  });

  async function add({ regionalId, ...regional }) {
    return await database.add("REGIONAL", regional);
  }
  async function findById({ regionalId, max, searchParam, searchValue }) {
    const params = ["ID_REGIONAL", "NOME_REGIONAL", "ESTADO", "PAIS"];
    return await database.findById(
      "REGIONAL",
      params,
      {
        ID_REGIONAL: regionalId,
      },
      max,
      searchParam,
      searchValue
    );
  }
  async function getItems() {
    const params = ["ID_REGIONAL", "NOME_REGIONAL", "ESTADO", "PAIS"];
    return await database.getItems("REGIONAL", params);
  }
  async function remove({ regionalId }) {
    return await database.remove("REGIONAL", {
      ID_REGIONAL: regionalId,
    });
  }
  async function replace({ regionalId, ...regional }) {
    return await database.replace("REGIONAL", regional, {
      ID_REGIONAL: regionalId,
    });
  }
  async function update({ regionalId, ...regional }) {
    return await database.update("REGIONAL", regional, {
      ID_REGIONAL: regionalId,
    });
  }
};
