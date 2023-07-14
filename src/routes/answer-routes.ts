import { Router } from "express";
import { addAnswer, deleteAnswer, downVoteAnswer, getAnswerById, getAnswers, upVoteAnswer, updateAnswer } from "../controllers/answer-controller";
import { VERIFY_TOKEN } from "../middleware/VERIFY_TOKEN";

/* INITIALIZE ROUTE */
const answerRoutes = Router();

answerRoutes.get('', getAnswers);
answerRoutes.get('/:answer_id', getAnswerById);
answerRoutes.post('', VERIFY_TOKEN, addAnswer);
answerRoutes.put('/:answer_id', VERIFY_TOKEN, updateAnswer);
answerRoutes.delete('/:answer_id',VERIFY_TOKEN, deleteAnswer);
answerRoutes.post('/upvote/:answer_id', VERIFY_TOKEN, upVoteAnswer);
answerRoutes.post('/downvote/:answer_id', VERIFY_TOKEN, downVoteAnswer);

export default answerRoutes;
