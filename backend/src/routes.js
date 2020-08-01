const express = require("express");

const routes = express.Router();

const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikesController = require("./controllers/DislikesController");

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);

routes.post("/devs/:devId/like", LikeController.store);
routes.post("/devs/:devId/dislike", DislikesController.store);

module.exports = routes;
