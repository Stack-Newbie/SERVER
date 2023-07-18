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
exports.deleteComment = exports.updateComment = exports.addComment = exports.getCommentById = exports.getComments = void 0;
/* CUSTOM MODULES */
const DB_OPERATIONS_1 = require("../helpers/DB-OPERATIONS");
/* EXPORT MODULE | getComments */
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let comments = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getComments')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(comments);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getComments = getComments;
/* EXPORT MODULE | getCommentById */
const getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET comment_id FROM REQUEST BODY */
        const { comment_id } = req.params;
        let comment = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getCommentById', { comment_id })).recordset[0];
        /* CHECK IF comment EXISTS */
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found!'
            });
        }
        /* SUCCESS STATE */
        return res.status(200).json(comment);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getCommentById = getCommentById;
/* EXPORT MODULE | addComment */
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* READ Request BODY */
        const { comment, answer_id, user_id } = req.body;
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('addComment', {
            comment, answer_id, user_id
        });
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Comment added successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.addComment = addComment;
/* EXPORT MODULE | updateComment */
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET comment_id */
        const { comment_id } = req.params;
        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED comment_id*/
        let original_comment = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getCommentById', { comment_id })).recordset[0];
        /* CHECK IF COMMENT EXISTS */
        if (!original_comment) {
            res.status(404).json({
                message: 'Comment not found!'
            });
        }
        /* PROCEED WITH UPDATE IF COMMENT EXISTS */
        const { comment, answer_id, user_id } = req.body;
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('updateComment', {
            comment_id, comment, answer_id, user_id
        });
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Comment updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.updateComment = updateComment;
/* EXPORT MODULE | deleteComment */
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET comment_id */
        const { comment_id } = req.params;
        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED comment_id*/
        let comment = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getCommentById', { comment_id })).recordset[0];
        yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('deleteComment', { comment_id }));
        /* CHECK IF COMMENT EXISTS */
        if (!comment) {
            res.status(404).json({
                message: 'Comment not found!'
            });
        }
        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Comment deleted!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.deleteComment = deleteComment;
