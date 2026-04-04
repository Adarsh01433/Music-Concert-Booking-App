require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors"); 

const {globalRateLimiter} = require("./src/middlewares/rateLimit")
const errorHandler = require("./src/middlewares/errorHandler");
const logger = require("./src/config/logger")
const routes = require("./src/routes/index")

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(globalRateLimiter);

app.use(errorHandler);

app.use("/api", routes);

const PORT = 3000;

app.listen(PORT, "0.0.0.0", ()=> {
  logger.info(`Server running on Port${PORT}`) 
});