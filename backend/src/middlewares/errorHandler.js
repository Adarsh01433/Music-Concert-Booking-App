
const logger = require("../config/logger")

const errorHandler = (err,req, res, next)=> {
  logger.error("Unhandled error", {err,path:req.path});
  res.status(500).json({
    error : "internal server error"
  })
}

module.exports = errorHandler