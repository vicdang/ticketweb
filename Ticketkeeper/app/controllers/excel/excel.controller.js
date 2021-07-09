const db = require("../../models");
const Ticket = db.ticket;

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let tickets = [];

      rows.forEach((row) => {
        let ticket = {
          id: row[0],
          title: row[1],
          site_url: row[2],
          gaptime: row[3],
          last_status: false,
          activated: true
        };
        tickets.push(ticket);
      });

      Ticket.bulkCreate(tickets)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getTickets = (req, res) => {
  Ticket.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tickets.",
      });
    });
};

module.exports = {
  upload,
  getTickets,
};