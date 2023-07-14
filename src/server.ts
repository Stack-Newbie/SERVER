/* CORE MODULES */
/* THIRD PARTY MODULES */
import express, { NextFunction, Request, Response } from 'express';
import { json } from 'express';
import cors from 'cors';
import userRoutes from './routes/user-routes';
import questionRoutes from './routes/question-routes';
import commentRoutes from './routes/comment-routes';
import answerRoutes from './routes/answer-routes';
import authenticationRoutes from './routes/authentication-routes';

/* INITIALIZE SERVER */
const SERVER = express();
const PORT = 8000;
/* MIDDLEWARE */
SERVER.use(cors({
    origin: "*"
}));

SERVER.use(json());

/* LOGGING DECORATOR */
function REQUEST_LOGGER(req: Request, res: Response, next: NextFunction) {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request METHOD: ${req.method}`);
    next();
}

/* ROUTES */
SERVER.use(REQUEST_LOGGER);
SERVER.use('/auth', authenticationRoutes);
SERVER.use('/users', userRoutes);
SERVER.use('/questions', questionRoutes);
SERVER.use('/answers', answerRoutes);
SERVER.use('/comments', commentRoutes);

SERVER.get('/', (req, res) => {
    res.send("Server is running..."); 
})

SERVER.listen(PORT, () => console.log(`

█▀ ▀█▀ ▄▀█ █▀█ ▀█▀ █ █▄░█ █▀▀ ░ ░
▄█ ░█░ █▀█ █▀▄ ░█░ █ █░▀█ █▄█ ▄ ▄

***********************************************
Server is running at: http://localhost:${PORT}
Terminate process : CTRL + C
***********************************************
`));

module.exports = SERVER;