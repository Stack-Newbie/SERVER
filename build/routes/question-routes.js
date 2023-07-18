"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = require("../controllers/question-controller");
const VERIFY_TOKEN_1 = require("../middleware/VERIFY_TOKEN");
/* INITIALIZE ROUTER */
const questionRoutes = (0, express_1.Router)();
questionRoutes.get('', question_controller_1.getQuestions);
questionRoutes.get('/:question_id', question_controller_1.getQuestionById);
questionRoutes.post('', VERIFY_TOKEN_1.VERIFY_TOKEN, question_controller_1.addQuestion);
questionRoutes.put('/:question_id', VERIFY_TOKEN_1.VERIFY_TOKEN, question_controller_1.updateQuestion);
questionRoutes.delete('/:question_id', VERIFY_TOKEN_1.VERIFY_TOKEN, question_controller_1.deleteQuestion);
exports.default = questionRoutes;
