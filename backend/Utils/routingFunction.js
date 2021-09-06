const functionsDatabase = require("./functionsDatabase");

module.exports = function routingFunction(method) {
    return async (req, res) => {
        try {
            await functionsDatabase.connectDB(
                method,
                req.body,
                functionForInteractingWithTheDatabase
            );

            function functionForInteractingWithTheDatabase(resultat) {
                if (resultat !== null) {
                    res.json(`${JSON.stringify(resultat)}`);
                } else {
                    res.send(`empty`);
                }
            }
        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, попробуйте снова",
            });
        }
    };
};
