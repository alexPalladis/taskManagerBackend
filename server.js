const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize } = require("./config/database");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler, notFound } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`\nEndpoints:`);
      console.log(`GET    http://localhost:${PORT}/api/tasks`);
      console.log(`POST   http://localhost:${PORT}/api/tasks`);
      console.log(`GET    http://localhost:${PORT}/api/tasks/:id`);
      console.log(`PUT    http://localhost:${PORT}/api/tasks/:id`);
      console.log(`DELETE http://localhost:${PORT}/api/tasks/:id`);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

startServer();
