"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downVoteAnswer = exports.upVoteAnswer = exports.deleteAnswer = exports.updateAnswer = exports.addAnswer = exports.getAnswerById = exports.getAnswers = void 0;
/* CUSTOM MODULES */
const DB_OPERATIONS_1 = require("../helpers/DB-OPERATIONS");
/* EXPORT MODULE | getAnswers */
const getAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let answers = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getAnswers')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(answers);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getAnswers = getAnswers;
/* EXPORT MODULE | getAnswerById */
const getAnswerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET answer_id FROM REQUEST BODY */
        const { answer_id } = req.params;
        let answer = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getAnswerById', { answer_id })).recordset[0];
        /* CHECK IF answer EXISTS */
        if (!answer) {
            return res.status(404).json({
                message: 'Answer not found!'
            });
        }
        /* SUCCESS STATE */
        return res.status(200).json(answer);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getAnswerById = getAnswerById;
/* EXPORT MODULE | addAnswer */
const addAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* READ Request BODY */
        const { answer, question_id, user_id, display_name } = req.body;
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('addAnswer', {
            answer, question_id, user_id, display_name
        });
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Answer added successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.addAnswer = addAnswer;
/* EXPORT MODULE | updateAnswer */
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;
        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED answer_id*/
        let original_answer = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getAnswerById', { answer_id })).recordset[0];
        /* CHECK IF COMMENT EXISTS */
        if (!original_answer) {
            res.status(404).json({
                message: 'Answer not found!'
            });
        }
        /* PROCEED WITH UPDATE IF COMMENT EXISTS */
        const { answer, question_id, user_id, display_name } = req.body;
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('updateAnswer', {
            answer_id, question_id, answer, user_id, display_name
        });
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Answer updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.updateAnswer = updateAnswer;
/* EXPORT MODULE | deleteAnswer */
const deleteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;
        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED answer_id*/
        let answer = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getAnswerById', { answer_id })).recordset[0];
        yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('deleteAnswer', { answer_id }));
        /* CHECK IF COMMENT EXISTS */
        if (!answer) {
            res.status(404).json({
                message: 'Answer not found!'
            });
        }
        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Answer deleted!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.deleteAnswer = deleteAnswer;
/* EXPORT MODULE | upvoteAnswer */
const upVoteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;
        /* READ req.body */
        const { user_id, vote_type } = req.body;
        /* INSERT VOTE */
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('InsertVote', {
            answer_id,
            user_id,
            vote_type
        });
        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Answer upvoted!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.upVoteAnswer = upVoteAnswer;
/* EXPORT MODULE | upvoteAnswer */
const downVoteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;
        /* READ req.body */
        const { user_id, vote_type } = req.body;
        /* INSERT VOTE */
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('InsertVote', {
            answer_id,
            user_id,
            vote_type
        });
        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Answer downvoted!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.downVoteAnswer = downVoteAnswer;
