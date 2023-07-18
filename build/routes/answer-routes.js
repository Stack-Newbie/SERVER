"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answer_controller_1 = require("../controllers/answer-controller");
const VERIFY_TOKEN_1 = require("../middleware/VERIFY_TOKEN");
/* INITIALIZE ROUTE */
const answerRoutes = (0, express_1.Router)();
answerRoutes.get('', answer_controller_1.getAnswers);
answerRoutes.get('/:answer_id', answer_controller_1.getAnswerById);
answerRoutes.post('', VERIFY_TOKEN_1.VERIFY_TOKEN, answer_controller_1.addAnswer);
answerRoutes.put('/:answer_id', VERIFY_TOKEN_1.VERIFY_TOKEN, answer_controller_1.updateAnswer);
answerRoutes.delete('/:answer_id', VERIFY_TOKEN_1.VERIFY_TOKEN, answer_controller_1.deleteAnswer);
answerRoutes.post('/upvote/:answer_id', VERIFY_TOKEN_1.VERIFY_TOKEN, answer_controller_1.upVoteAnswer);
answerRoutes.post('/downvote/:answer_id', VERIFY_TOKEN_1.VERIFY_TOKEN, answer_controller_1.downVoteAnswer);
exports.default = answerRoutes;
