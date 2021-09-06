const userControllers = require("../Controllers/users.controllers");
const cors = require("cors");
const bodyParser = require("body-parser");

module.exports = (app) => {
    app.use(cors({ origin: true, credentials: true }));
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.post("/auth", userControllers.auth);
    app.post("/getUserData", userControllers.getUserData);
    app.post("/createPlacemark", userControllers.createPlacemark);
    app.post("/getPlacemarksData", userControllers.getPlacemarksData);
    app.post("/updatePlacemark", userControllers.updatePlacemark);
    app.post("/deletePlacemark", userControllers.deletePlacemark);
};
