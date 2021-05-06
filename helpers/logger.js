module.exports = class Logger {
  logInfo(data) {
    console.log("[INFO]", data);
  }

  logError(error) {
    console.log("[ERROR]", error);
  }
};
