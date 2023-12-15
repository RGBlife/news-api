const { serverStatus } = require ('../controllers/status.controller')
const statusRouter = require('express').Router();

statusRouter.route("/").get(serverStatus)

module.exports = statusRouter;