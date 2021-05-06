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

  async function getRegionals(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { max } = httpRequest.queryParams || {};

    const result = id
      ? await regionalList.findById({
          regionalId: id,
        })
      : await regionalList.getItems({
          max,
        });

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
};
