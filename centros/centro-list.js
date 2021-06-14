const makeCentro = require("./centro");
const { UniqueConstraintError } = require("../helpers/errors");

module.exports = function makeCentroList({ database }) {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  function formatOutput(items) {
    let centros = [];

    if (items) {
      if (items.length > 0) {
        items.forEach((item) => {
          let centro = makeCentro(item);
          centros.push(centro);
        });
      } else {
        let centro = makeCentro(items);
        centros.push(centro);
      }
    }

    return centros;
  }

  async function add(centroInfo) {
    let centro = makeCentro(centroInfo);
    return await database.add(centro);
  }
  async function findByItems({ max, searchParams }) {
    let centro = await database.findByItems(max, searchParams);

    const centros = formatOutput(centro);
    return centros;
  }
  async function getItems({ max }) {
    let items = await database.getItems(max);

    const centros = formatOutput(items);

    return centros;
  }
  async function remove(searchParams) {
    return await database.remove(searchParams);
  }
  async function replace({ searchParams, centro }) {
    return await database.replace(centro, searchParams);
  }
  async function update({ searchParams, centro }) {
    return await database.update(centro, searchParams);
  }
};
