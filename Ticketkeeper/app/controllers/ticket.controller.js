const db = require("../models");
const Ticket = db.ticket;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tickets } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tickets, totalPages, currentPage };
};

// Create and Save a new Ticket
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Ticket
    const ticket = {
      title: req.body.title,
      site_url: req.body.site_url,
      gaptime: req.body.gaptime,
      last_status: req.body.last_status ? req.body.last_status : false,
      activated: req.body.activated ? req.body.activated : true
    };
  
    // Save Ticket in the database
    Ticket.create(ticket)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Ticket."
        });
      });
  };

// Retrieve all Ticket from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);
  Ticket.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tickets."
      });
    });
  };

// Find a single Ticket with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Ticket.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Ticket with id=" + id
        });
      });
  };

// Find all activated Ticket
exports.findAllActivated = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Ticket.findAndCountAll({ where: { activated: true }, limit, offset })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tickets."
    });
  });
};

// Find all ready Ticket
exports.findAllReady = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Ticket.findAndCountAll({ where: { last_status: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tickets."
      });
    });
};

// Update a Ticket by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Ticket.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ticket was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Ticket with id=${id}. Maybe Ticket was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Ticket with id=" + id
        });
      });
  };

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Ticket.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Ticket was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Ticket with id=${id}. Maybe Ticket was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Ticket with id=" + id
        });
      });
  };

// Delete all Ticket from the database.
exports.deleteAll = (req, res) => {
    Ticket.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Ticket were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all ticket."
        });
      });
  };
