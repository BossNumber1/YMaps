const session = require("express-session");
const FileStore = require("session-file-store")(session);
const passport = require("passport");
const crypto = require("crypto");
const tokenKey = "1a2b-3c4d-5e6f-7g8h";

module.exports = (app, id) => {
    app.use(
        session({
            secret: "hghtyNN23h",
            store: new FileStore(),
            cookie: {
                path: "/",
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            },
            resave: false,
            saveUninitialized: false,
        })
    );

    require("../Controllers/getDataFromDB")(getData);

    function getData(userDB) {
        require("../PassportJS/config-passport")(userDB, id);
    }

    app.use(passport.initialize());
    app.use(passport.session());

    app.post("/comparison", (req, res, next) => {
        passport.authenticate("local", function (err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Неверные login или пароль!" });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

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
            });
        })(req, res, next);
    });
};
