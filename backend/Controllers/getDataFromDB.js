const functionsDatabase = require("../Utils/functionsDatabase");
const ScriptsForDB = require("./ScriptsForDB");

module.exports = async (getData) => {
    try {
        await functionsDatabase.connectDB(
            ScriptsForDB.getDataAllUsers,
            "",
            (resultat) => getData(resultat)
        );
    } catch (e) {
        res.status(500).json({
            message: "Что-то пошло не так, стоит попробовать снова",
        });
    }
};
