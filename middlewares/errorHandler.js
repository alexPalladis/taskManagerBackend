const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((e) => e.message);
    return res
      .status(400)
      .json({ success: false, message: "Validation Error", errors });
  }

  if (err.name === "SequelizeDatabaseError") {
    return res
      .status(500)
      .json({ success: false, message: "Database Error", error: err.message });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

const notFound = (req, res) => {
  res
    .status(404)
    .json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

module.exports = { errorHandler, notFound };
