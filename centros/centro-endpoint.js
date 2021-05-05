const {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} = require("../helpers/errors");
const makeHttpError = require("../helpers/http-error");
const makeCentro = require("./centro");

module.exports = function makeCentroEndpointHandler({ centroList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postCentro(httpRequest);
        break;
      case "GET":
        return getCentros(httpRequest);
        break;
      case "DELETE":
        return removeCentro(httpRequest);
        break;
      case "PUT":
        return updateCentro(httpRequest);
        break;

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`,
        });
        break;
    }
  };

  async function getCentros(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { max, ...params } = httpRequest.queryParams || {};

    //work for one param for a while
    let paramKeys = Object.keys(params);
    let paramValues = Object.values(params);
    let searchValue = paramValues[0];

    let searchParamConverted = convertSearchParam(paramKeys[0]);

    let hasQuery = function (id, searchParam, searchValue) {
      return id || (searchParam && searchValue);
    };
    const result = hasQuery(id, searchParamConverted, searchValue)
      ? await centroList.findById({
          centroId: id,
          max,
          searchParam: searchParamConverted,
          searchValue,
        })
      : await centroList.getItems({
          max,
        });

    let centrosReturn = [];

    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      const centroParsed = makeCentro(element);
      centrosReturn.push(centroParsed);
    }

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(centrosReturn),
    };
  }

  async function postCentro(httpRequest) {
    let centroInfo = httpRequest.body;
    if (!centroInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        centroInfo = JSON.parse(centroInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const centro = makeCentro(centroInfo);
      const result = await centroList.add(centro);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        data: JSON.stringify(result),
      };
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
            ? 400
            : 500,
      });
    }
  }

  async function removeCentro(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = await centroList.remove({
      centroId: id,
    });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function updateCentro(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    let centroInfo = httpRequest.body;
    if (!centroInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PUT body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        centroInfo = JSON.parse(centroInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PUT body must be valid JSON.",
        });
      }
    }

    try {
      centroInfo.centroId = id;
      centroInfo = makeCentro(centroInfo);
      const result = await centroList.update(centroInfo);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        data: JSON.stringify(result),
      };
    } catch (e) {
      return makeHttpError({
        errorMessage: e.message,
        statusCode:
          e instanceof UniqueConstraintError
            ? 409
            : e instanceof InvalidPropertyError ||
              e instanceof RequiredParameterError
            ? 400
            : 500,
      });
    }
  }

  function convertSearchParam(searchParam) {
    switch (searchParam) {
      case "nome":
        return "NOME_CENTRO";
      case "id_regional":
        return "ID_REGIONAL";
      case "endereco":
        return "ENDERECO";
      case "cidade":
        return "CIDADE";
      case "estado":
        return "ESTADO";
      case "pais":
        return "PAIS";
      case "curto":
        return "NOME_CURTO";
      default:
        return null;
    }
  }
};
