const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUser = {};

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;

  connectedUser[user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://italo:italo@cluster0.gpcne.mongodb.net/omnistack8?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUser = connectedUser;
  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
