const functionsDatabase = require("./functionsDatabase");
const jwt_decode = require("jwt-decode");

module.exports = function routingFunction(method, tokenCreation = null) {
    return async (req, res) => {
        try {
            function getUserData() {
                if (req.body.token) {
                    let decoded = jwt_decode(req.body.token);
                    console.log("decoded =", decoded);
                    return {
                        id_user: decoded.id,
                        login: decoded.login,
                        password: decoded.password,
                        ...req.body,
                    };
                } else {
                    return req.body;
                }
            }

            await functionsDatabase.connectDB(
                method,
                getUserData(),
                functionForInteractingWithTheDatabase
            );

            function functionForInteractingWithTheDatabase(resultat) {
                if (resultat !== null) {
                    if (tokenCreation) {
                        tokenCreation(JSON.stringify(resultat), req, res);
                    } else {
                        res.json(`${JSON.stringify(resultat)}`);
                    }
                } else {
                    res.status(404).send("Данных нет");
                }
            }
        } catch (e) {
            res.status(500).json({
                message: "Что-то пошло не так, стоит попробовать снова",
            });
        }
    };
};
