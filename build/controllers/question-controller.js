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
exports.deleteQuestion = exports.updateQuestion = exports.addQuestion = exports.getQuestionById = exports.getQuestions = void 0;
/* CUSTOM MODULES */
const DB_OPERATIONS_1 = require("../helpers/DB-OPERATIONS");
/* EXPORT MODULE | getQuestions */
const getQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // GET questions
        let questions = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('GetQuestionsWithAnswersAndDisplayNames')).recordset;
        // FORMAT THE questions ARRAY
        const formattedQuestions = questions.map((question) => {
            // PARSE THE answers FIELD FROM string TO AN array OF objects
            const answers = question.answers ? JSON.parse(question.answers) : [];
            // FROMAT THE date_created FIELD
            const dateCreated = new Date(question.date_created);
            // PASS IN PARAMETERS TO toLocaleDateString() TO SPECIFY THE
            // DESIRED FORMAT | Optional
            const formattedDate = dateCreated.toLocaleDateString();
            // CREATE THE formattedQuestions OBJECT
            return {
                question_id: question.question_id,
                question: question.question,
                additional_info: question.additional_info,
                category: question.category,
                date_created: formattedDate,
                question_asker_id: question.question_asker_id,
                question_asker: question.question_asker,
                answers: answers
            };
        });
        // RETURN THE formattedQuestions AS THE RESPONSE
        res.status(200).json(formattedQuestions);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getQuestions = getQuestions;
/* EXPORT MODULE | getQuestionById */
const getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET question_id FROM REQUEST BODY */
        const { question_id } = req.params;
        let question = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getQuestionById', { question_id })).recordset[0];
        /* CHECK IF question EXISTS */
        if (!question) {
            return res.status(404).json({
                message: 'Question not found!'
            });
        }
        /* SUCCESS STATE */
        return res.status(200).json(question);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getQuestionById = getQuestionById;
/* EXPORT MODULE | addQuestion */
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* READ Request BODY */
        const { question, additional_info, category, user_id } = req.body;
        /* CHECK IF TOKEN EXISTS */
        if (req.info) {
            yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('addQuestion', {
                question,
                additional_info,
                category,
                user_id
            });
        }
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Question added successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.addQuestion = addQuestion;
/* EXPORT MODULE | updateQuestion */
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET question_id */
        const { question_id } = req.params;
        /*RETRIEVE QUESTION FROM DATABSE USING ASSIGNED question_id*/
        let original_question = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getQuestionById', { question_id })).recordset[0];
        /* CHECK IF QUESTION EXISTS */
        if (!original_question) {
            res.status(404).json({
                message: 'Question not found!'
            });
        }
        /* PROCEED WITH UPDATE IF QUESTION EXISTS */
        const { question, additional_info, category, user_id } = req.body;
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('updateQuestion', {
            question_id, question, additional_info, category, user_id
        });
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Question updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.updateQuestion = updateQuestion;
/* EXPORT MODULE | deleteQuestion */
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET question_id */
        const { question_id } = req.params;
        /*RETRIEVE QUESTION FROM DATABSE USING ASSIGNED question_id*/
        let question = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getQuestionById', { question_id })).recordset[0];
        yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('deleteQuestion', { question_id }));
        /* CHECK IF QUESTION EXISTS */
        if (!question) {
            res.status(404).json({
                message: 'Question not found!'
            });
        }
        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Question deleted!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.deleteQuestion = deleteQuestion;
