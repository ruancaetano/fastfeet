require('dotenv/config');

module.exports = {
  dialect: process.env.DIALECT,
  database: process.env.DATABASE,
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  define: {
    timestamps: true,
    underscored: true,
  },
};
