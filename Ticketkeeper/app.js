const express = require("express");
const cors = require("cors");
const initRoutes = require("./app/routes/ticket.routes");

const app = express();

const fs = require('fs');

const config = JSON.parse(fs.readFileSync('../conf.json', (err, data) => {
    if (err) throw err;
}));

global.__basedir = __dirname;
global.__ipAddress = config['ipAddress'];
global.__ngPort = config['ngPort'];
global.__nodePort = config['nodePort'];

var corsOptions = {
  origin: "http://"+global.__ipAddress+":"+global.__ngPort+"/"
};

// app.use(cors(corsOptions));
app.use(cors());

const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ticket-keeper application." });
});

require("./app/routes/ticket.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || global.__nodePort;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});
