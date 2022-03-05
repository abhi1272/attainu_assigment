let appConfig = {};

appConfig.port = 5000;
appConfig.env = "dev";
appConfig.JWT_SECRET = "ransom";
appConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/restaurant'
};
  

module.exports = {
    port: appConfig.port,
    environment: appConfig.env,
    db :appConfig.db,
};