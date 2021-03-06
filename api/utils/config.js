module.exports = {
  PORT: parseInt(process.env.PORT || 3400),
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_EXPIRY: parseInt(process.env.TOKEN_EXPIRY),
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY: parseInt(process.env.REFRESH_TOKEN_EXPIRY),
  MONGO_DB_PATH: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`
};