const cors = require("cors");
const bodyParser = require("body-parser");
const generalFunctionForRoutes_POST = require("./generalFunctionForRoutes_POST");
const generalFunctionConnectWithDB = require("./database");
const ScriptsForDB = require("../ScriptsForDB");

module.exports = router = (app) => {
    app.use(cors({ origin: true, credentials: true }));
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );

    app.get("/", (request, response) => {
        try {
            response.redirect("/api/");
        } catch (e) {
            response.send(`Что-то пошло не так, попробуйте снова`);
        }
    });

    app.get("/api/", (request, response) => {
        try {
            response.send(`Это <b>REST API</b> на Node.js and Express`);
        } catch (e) {
            response.send(`Что-то пошло не так, попробуйте снова`);
        }
    });

    generalFunctionForRoutes_POST(
        app,
        generalFunctionConnectWithDB,
        "/auth/",
        ScriptsForDB.saveUser
    );

    generalFunctionForRoutes_POST(
        app,
        generalFunctionConnectWithDB,
        "/getUserData/",
        ScriptsForDB.getUserData
    );

    generalFunctionForRoutes_POST(
        app,
        generalFunctionConnectWithDB,
        "/createPlacemark/",
        ScriptsForDB.createPlacemark
    );

    generalFunctionForRoutes_POST(
        app,
        generalFunctionConnectWithDB,
        "/getPlacemarksData/",
        ScriptsForDB.getPlacemarksData
    );

    generalFunctionForRoutes_POST(
        app,
        generalFunctionConnectWithDB,
        "/updatePlacemark/",
        ScriptsForDB.updatePlacemark
    );

    generalFunctionForRoutes_POST(
        app,
        generalFunctionConnectWithDB,
        "/deletePlacemark/",
        ScriptsForDB.deletePlacemark
    );
};
