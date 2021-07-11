const db = require("../../models");
const Ticket = db.ticket;

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }
    if (req.params.type == "event") {
      path = __basedir + "/resources/static/assets/uploads/events/" + req.file.filename;
    } else if (req.params.type == "venue") {
      path = __basedir + "/resources/static/assets/uploads/venues/" + req.file.filename;
    } else {
      return res.status(400).send("Unexpected type!");
    };
    readXlsxFile(path).then((rows) => {
      if (req.params.type == "event") {
        // skip header
        rows.shift();

        let tickets = [];

        rows.forEach((row) => {
          let ticket = {
            title: row[0],
            site_url: row[0],
            gaptime: row[1],
            last_status: false,
            activated: row[2] ? row[2] : true
          };
          tickets.push(ticket);
        });

        Ticket.bulkCreate(tickets)
          .then(() => {
            res.status(200).send({
              message: "Uploaded and inserted: " + req.file.filename,
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error.message,
            });
          });
        } else {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.filename,
          });
        };
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

module.exports = {
  upload
};