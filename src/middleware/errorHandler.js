const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    error: {
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    },
  });
};

module.exports = {
  errorHandler,
};
