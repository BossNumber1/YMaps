const ScriptsForDB = require("../Controllers/ScriptsForDB");

module.exports = class functionsDatabase {
    static async connectDB(
        methodDB,
        parametres,
        functionForInteractingWithTheDatabase
    ) {
        let params =
            typeof parametres === "string" ? parametres : { ...parametres };

        // Общая функция подключения к БД
        const sqlite3 = require("sqlite3").verbose();

        async function workInDB() {
            new Promise((resolve, reject) => {
                let db = new sqlite3.Database("map_test.db", (err) => {
                    if (err) reject(err);

                    resolve(
                        ScriptsForDB.setDB(db),
                        methodDB(params).then((resultat) => {
                            functionForInteractingWithTheDatabase(resultat);
                        })
                    );
                });
            });
        }

        return workInDB();
    }
};
