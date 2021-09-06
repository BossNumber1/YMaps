const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 80;

const server = http.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Сервер запущен на порту ${server.address().port}`);
});

const routes = require("./Routes/users.routes");

routes(app);
