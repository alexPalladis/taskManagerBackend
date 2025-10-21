const { Sequelize } = require("sequelize");
const path = require("path");

// Create Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "database.sqlite"),
  logging: false, // Set to console.log to see SQL queries
  define: {
    timestamps: true,
    underscored: false,
  },
});

module.exports = { sequelize };
