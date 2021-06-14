module.exports = function makeDb(Model) {
  return Object.freeze({
    add,
    findByItems,
    getItems,
    remove,
    replace,
    update,
  });

  function formatParams(searchParams) {
    let items = Object.keys(searchParams);
    let values = Object.values(searchParams);

    searchParams = {};
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const value = values[index];
      if (item == "ID") {
        item = "_id";
      }

      if (item.toLocaleLowerCase().contains("id")) {
        searchParams[item] = { value };
      } else {
        searchParams[item] = { $regex: value };
      }
    }

    return searchParams;
  }

  async function add(pessoaInfo) {
    try {
      pessoa = new Model(pessoaInfo);

      await pessoa.save();
    } catch (error) {
      throw error;
    }
  }
  async function findByItems(max, params) {
    try {
      params = formatParams(params);
      return await Model.findOne(params);
    } catch (error) {
      throw error;
    }
  }
  async function getItems(max) {
    try {
      return await Model.find();
    } catch (error) {
      throw error;
    }
  }
  async function remove(conditions) {
    try {
      conditions = formatParams(conditions);
      const result = await Model.deleteOne(conditions);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function replace(pessoa, conditions) {
    try {
      conditions = formatParams(conditions);
      const result = await Model.replaceOne(conditions, pessoa);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async function update(pessoa, conditions) {
    try {
      conditions = formatParams(conditions);
      const result = await Model.updateOne(conditions, pessoa);
      return result;
    } catch (error) {
      throw error;
    }
  }
};
