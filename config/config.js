require('dotenv').config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_URL } = process.env;
process.env.NODE_ENV = 'production';


module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "postgres_sequelize_dev",
    "host": DB_HOST,
    "dialect": "postgres",
    "port": 5432,
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "postgres_sequelize_test",
    "host": DB_HOST,
    "dialect": "postgres",
    "port": 5432,
  },
  "production": {
    use_env_variable: DB_URL,
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    },
  },
};