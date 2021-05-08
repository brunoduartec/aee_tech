const {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
} = require("../helpers/errors");
const makeHttpError = require("../helpers/http-error");
const makeRegional = require("./regional");
const Logger = require("../helpers/logger");
const logger = new Logger();

module.exports = function makeRegionalEndpointHandler({ regionalList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "POST":
        return postRegional(httpRequest);
        break;
      case "GET":
        return getRegionals(httpRequest);
        break;
      case "DELETE":
        return removeRegional(httpRequest);
        break;
      case "PUT":
        return updateRegional(httpRequest);
        break;

      default:
        let errorMessage = `${httpRequest.method} method not allowed.`;
        logger.logError(errorMessage);

        return makeHttpError({
          statusCode: 405,
          errorMessage: errorMessage,
        });
        break;
    }
  };

  function selectParam(params) {
    //work for one param for a while
    let paramKeys = Object.keys(params);
    let paramValues = Object.values(params);

    let searchParam = paramKeys[0];
    let searchValue = paramValues[0];

    let searchParamConverted = convertSearchParam(paramKeys[0]);
    return {
      searchParam: searchParam,
      searchValue: searchValue,
      searchParamConverted: searchParamConverted,
    };
  }

  async function getRegionals(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { max, ...params } = httpRequest.queryParams || {};

    //work for one param for a while
    let { searchParam, searchValue, searchParamConverted } = selectParam(
      params
    );

    let result = [];

    if (searchParam) {
      if (searchParamConverted) {
        result = await regionalList.findById({
          regionalId: id,
          max,
          searchParam: searchParamConverted,
          searchValue,
        });
      } else {
        throw new RequiredParameterError("Query param not match list");
      }
    } else {
      result = await regionalList.getItems({
        max,
      });
    }

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function postRegional(httpRequest) {
    let regionalInfo = httpRequest.body;
    if (!regionalInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        regionalInfo = JSON.parse(regionalInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON.",
        });
      }
    }

    try {
      const regional = makeRegional(regionalInfo);
      const result = await regionalList.add(regional);
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

  async function removeRegional(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const result = await regionalList.remove({
      regionalId: id,
    });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      data: JSON.stringify(result),
    };
  }

  async function updateRegional(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    let regionalInfo = httpRequest.body;
    if (!regionalInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No PUT body",
      });
    }

    if (typeof httpRequest.body == "string") {
      try {
        regionalInfo = JSON.parse(regionalInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. PUT body must be valid JSON.",
        });
      }
    }

    try {
      regionalInfo.regionalId = id;
      const result = await regionalList.update(regionalInfo);
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
        return "NOME_REGIONAL";
        break;
      case "pais":
        return "PAIS";
        break;
      default:
        return null;
    }
  }
};
