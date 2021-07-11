const multer = require("multer");

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.params.type == "event") {
      cb(null, __basedir + "/resources/static/assets/uploads/events/");
    } else if (req.params.type == "venue") {
      cb(null, __basedir + "/resources/static/assets/uploads/venues/");
    } else {
      cb(null, "/dev/null");
    };
  },
  filename: (req, file, cb) => {
    if (req.params.type == "event") {
      cb(null, `${Date.now()}-event-${file.originalname}`);
    } else if (req.params.type == "venue") {
      cb(null, `${Date.now()}-venue-${file.originalname}`);
    } else {
      cb(null, "");
    };
  },
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;