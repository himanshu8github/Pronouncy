
const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.name}: ${err.message}`);

  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;


  if (err.name === 'ValidationError') {
    statusCode = 400;
  }

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
