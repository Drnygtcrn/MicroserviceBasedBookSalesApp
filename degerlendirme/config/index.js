const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: 8001,//process.env.PORT,
  DB_URL: "mongodb://127.0.0.1:27017/denizdilbaz"  ,    //process.env.MONGODB_URI,
  APP_SECRET: "ASDASASD"//process.env.APP_SECRET,
};
