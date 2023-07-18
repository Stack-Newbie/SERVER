"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* CORE MODULES */
/* THIRD PARTY MODULES */
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const question_routes_1 = __importDefault(require("./routes/question-routes"));
const comment_routes_1 = __importDefault(require("./routes/comment-routes"));
const answer_routes_1 = __importDefault(require("./routes/answer-routes"));
const authentication_routes_1 = __importDefault(require("./routes/authentication-routes"));
/* INITIALIZE SERVER */
const SERVER = (0, express_1.default)();
const PORT = 8000;
/* MIDDLEWARE */
SERVER.use((0, cors_1.default)({
    origin: "*"
}));
SERVER.use((0, express_2.json)());
/* LOGGING DECORATOR */
function REQUEST_LOGGER(req, res, next) {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request METHOD: ${req.method}`);
    next();
}
/* ROUTES */
SERVER.use(REQUEST_LOGGER);
SERVER.use('/auth', authentication_routes_1.default);
SERVER.use('/users', user_routes_1.default);
SERVER.use('/questions', question_routes_1.default);
SERVER.use('/answers', answer_routes_1.default);
SERVER.use('/comments', comment_routes_1.default);
SERVER.get('/', (req, res) => {
    res.send("Server is running...");
});
SERVER.listen(PORT, () => console.log(`

█▀ ▀█▀ ▄▀█ █▀█ ▀█▀ █ █▄░█ █▀▀ ░ ░
▄█ ░█░ █▀█ █▀▄ ░█░ █ █░▀█ █▄█ ▄ ▄

***********************************************
Server is running at: http://localhost:${PORT}
Terminate process : CTRL + C
***********************************************
`));
module.exports = SERVER;
