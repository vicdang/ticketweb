module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
      title: {
        type: Sequelize.STRING
      },
      site_url: {
        type: Sequelize.STRING
      },
      gaptime: {
        type: Sequelize.INTEGER
      },
      last_status: {
        type: Sequelize.BOOLEAN
      },
      activated: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Ticket;
  };