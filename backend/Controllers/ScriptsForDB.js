let db;

module.exports = class ScriptsForDB {
    static setDB(newDB) {
        db = newDB;
    }

    // добавляем пользователя
    static async saveUser(userData) {
        const { login, password } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `INSERT INTO userData (login, password) VALUES (?, ?)`,
                [login, password],
                (err) => (err ? reject(err) : resolve(true))
            )
        ).then(async () => {
            return new Promise((resolve, reject) =>
                db.get(
                    "SELECT id FROM userData WHERE login = ?",
                    [login],
                    (err, row) =>
                        err ? reject(err) : !row ? resolve(null) : resolve(row)
                )
            ).then((element) => {
                return element;
            });
        });
    }

    // получаем пользователя
    static async getUserData(userData) {
        const { login } = userData;
        return new Promise((resolve, reject) =>
            db.get(
                "SELECT * FROM userData WHERE login = ?",
                [login],
                (err, row) =>
                    err ? reject(err) : !row ? resolve(null) : resolve(row)
            )
        );
    }

    // получаем всех пользователей
    static async getDataAllUsers() {
        return new Promise((resolve, reject) =>
            db.all("SELECT id, login, password FROM userData", (err, row) =>
                err ? reject(err) : !row ? resolve(null) : resolve([...row])
            )
        );
    }

    // добавляем координаты и имя метки
    static async createPlacemark(userData) {
        const { id_user, name, latitude, longitude } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `INSERT INTO mapData (id_user, name, latitude, longitude) VALUES (?, ?, ?, ?)`,
                [id_user, name, latitude, longitude],
                (err) => (err ? reject(err) : resolve("Метка - в базе"))
            )
        );
    }

    // получаем координаты и имя метки
    static async getPlacemarksData(userData) {
        const { id_user } = userData;
        return new Promise((resolve, reject) =>
            db.all(
                "SELECT * FROM mapData WHERE id_user = ?",
                [id_user],
                (err, row) =>
                    err ? reject(err) : !row ? resolve(null) : resolve([...row])
            )
        );
    }

    // обновляем координаты и имя метки
    static async updatePlacemark(userData) {
        const { name, latitude, longitude, id_user, oldName } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `UPDATE mapData SET name = ?, latitude = ?, longitude = ? WHERE id_user = ? AND name = ?`,
                [name, latitude, longitude, id_user, oldName],
                (err) => (err ? reject(err) : resolve("Метка обновлена"))
            )
        );
    }

    // удаляем метку
    static async deletePlacemark(userData) {
        const { id_user, name } = userData;
        return new Promise((resolve, reject) =>
            db.run(
                `DELETE FROM mapData WHERE id_user = ? AND name = ?`,
                [id_user, name],
                (err) => (err ? reject(err) : resolve("Метка удалена"))
            )
        );
    }
};
