import { Router } from "express";
import { getQuestions, getQuestionById, addQuestion, updateQuestion, deleteQuestion } from "../controllers/question-controller";
import { VERIFY_TOKEN } from "../middleware/VERIFY_TOKEN";

/* INITIALIZE ROUTER */
const questionRoutes = Router();

questionRoutes.get('', getQuestions);
questionRoutes.get('/:question_id', getQuestionById);
questionRoutes.post('', VERIFY_TOKEN, addQuestion);
questionRoutes.put('/:question_id', VERIFY_TOKEN, updateQuestion);
questionRoutes.delete('/:question_id', VERIFY_TOKEN, deleteQuestion);

export default questionRoutes; 