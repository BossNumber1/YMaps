const routingFunction = require("../Utils/routingFunction");
const ScriptsForDB = require("./ScriptsForDB");
const crypto = require("crypto");
const tokenKey = "1a2b-3c4d-5e6f-7g8h";

const comparison = routingFunction(ScriptsForDB.getDataAllUsers, tokenCreation);

function tokenCreation(data, req, res) {
    for (let user of JSON.parse(data)) {
        if (
            req.body.login === user.login &&
            req.body.password === user.password
        ) {
            let head = Buffer.from(
                JSON.stringify({ alg: "HS256", typ: "jwt" })
            ).toString("base64");
            let body = Buffer.from(JSON.stringify(user)).toString("base64");
            let signature = crypto
                .createHmac("SHA256", tokenKey)
                .update(`${head}.${body}`)
                .digest("base64");

            return res.status(200).json({
                login: user.login,
                token: `${head}.${body}.${signature}`,
            });
        }
    }

    res.status(404).send("Неверные данные");
}

const auth = routingFunction(ScriptsForDB.saveUser);
const getUserData = routingFunction(ScriptsForDB.getUserData);
const createPlacemark = routingFunction(ScriptsForDB.createPlacemark);
const getPlacemarksData = routingFunction(ScriptsForDB.getPlacemarksData);
const updatePlacemark = routingFunction(ScriptsForDB.updatePlacemark);
const deletePlacemark = routingFunction(ScriptsForDB.deletePlacemark);

module.exports = {
    comparison,
    auth,
    getUserData,
    getPlacemarksData,
    createPlacemark,
    updatePlacemark,
    deletePlacemark,
};
