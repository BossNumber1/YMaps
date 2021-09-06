const routingFunction = require("../Utils/routingFunction");
const ScriptsForDB = require("./ScriptsForDB");

const auth = routingFunction(ScriptsForDB.saveUser);
const getUserData = routingFunction(ScriptsForDB.getUserData);
const createPlacemark = routingFunction(ScriptsForDB.createPlacemark);
const getPlacemarksData = routingFunction(ScriptsForDB.getPlacemarksData);
const updatePlacemark = routingFunction(ScriptsForDB.updatePlacemark);
const deletePlacemark = routingFunction(ScriptsForDB.deletePlacemark);

module.exports = {
    auth,
    getUserData,
    getPlacemarksData,
    createPlacemark,
    updatePlacemark,
    deletePlacemark,
};
