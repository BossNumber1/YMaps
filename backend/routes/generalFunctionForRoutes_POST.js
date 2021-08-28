module.exports = function generalFunctionForRoutes_POST(
    app,
    generalFunctionConnectWithDB,
    url,
    method
) {
    return app.post(url, async (req, res) => {
        try {
            await generalFunctionConnectWithDB.connectDB(
                method,
                req.body,
                functionForInteractingWithTheDatabase
            );

            function functionForInteractingWithTheDatabase(resultat) {
                console.log("resultat =", resultat);
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
    });
};
