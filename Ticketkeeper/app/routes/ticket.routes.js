const express = require("express");
const router = express.Router();
const excelController = require("../controllers/excel/excel.controller");
const upload = require("../middlewares/upload");

let routes = app => {
    const ticket = require("../controllers/ticket.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Ticket
    router.post("/", ticket.create);
  
    // Retrieve all Tickets
    router.get("/", ticket.findAll);
  
    // Retrieve all activated Ticket
    router.get("/activated", ticket.findAllActivated);

    // Retrieve all activated Ticket
    router.get("/ready", ticket.findAllReady);
  
    // Retrieve a single Ticket with id
    router.get("/:id", ticket.findOne);
  
    // Update a Ticketwith id
    router.put("/:id", ticket.update);
  
    // Delete a Ticket with id
    router.delete("/:id", ticket.delete);
  
    // Delete all Ticket
    router.delete("/", ticket.deleteAll);

    router.post("/upload", upload.single("file"), excelController.upload);
    router.get("/tickets", excelController.getTickets);
  
    app.use('/api/ticket', router);
  };

  module.exports = routes;