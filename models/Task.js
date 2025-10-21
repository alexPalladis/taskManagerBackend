const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Define Task model
const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title cannot be empty",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      defaultValue: "pending",
      allowNull: false,
      validate: {
        isIn: {
          args: [["pending", "in-progress", "completed"]],
          msg: "Status must be pending, in-progress, or completed",
        },
      },
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

module.exports = Task;
