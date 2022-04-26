/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const tedious = require('tedious');

module.exports = {
  development: {
    dialect: 'mssql',
    dialectModule: tedious,
    dialectOptions: { options: { instanceName: process.env.DB_INSTANCE_NAME } },
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : null,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: process.env.DB_LOGGING === 'true' ? true : false,
    timezone: process.env.DB_TIME_ZONE || '-03:00',
    autoLoadModels: true,
    synchronize: false,
    define: { timestamps: true },
    pool: {
      max: 30,
      min: 0,
      idle: 10000,
    },
    retry: {
      match: [/Deadlock/i],
      max: 3, // Maximum rety 3 times
      backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
  }
};
