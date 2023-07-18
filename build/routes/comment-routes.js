"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controllers/comment-controller");
const VERIFY_TOKEN_1 = require("../middleware/VERIFY_TOKEN");
/* INITIALIZE ROUTER */
const commentRoutes = (0, express_1.Router)();
commentRoutes.get('', comment_controller_1.getComments);
commentRoutes.get('/:comment_id', comment_controller_1.getCommentById);
commentRoutes.post('', VERIFY_TOKEN_1.VERIFY_TOKEN, comment_controller_1.addComment);
commentRoutes.put('/:comment_id', VERIFY_TOKEN_1.VERIFY_TOKEN, comment_controller_1.updateComment);
commentRoutes.delete('/:comment_id', VERIFY_TOKEN_1.VERIFY_TOKEN, comment_controller_1.deleteComment);
exports.default = commentRoutes;
