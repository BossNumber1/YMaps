const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = (arrayData, id) => {
    let userDB;

    for (let i = 0; i < arrayData.length; i++) {
        if (arrayData[i].id === +id) {
            userDB = arrayData[i];
        }
    }

    passport.deserializeUser(function (id, done) {
        const user = userDB.id === id ? userDB : false;
        done(null, user);
    });

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.use(
        new LocalStrategy({ usernameField: "login" }, function (
            login,
            password,
            done
        ) {
            if (login === userDB.login && password === userDB.password) {
                return done(null, userDB);
            } else {
                return done(null, false);
            }
        })
    );
};
