import { Router } from 'express';
import { addComment, deleteComment, getCommentById, getComments, updateComment } from '../controllers/comment-controller';
import { VERIFY_TOKEN } from '../middleware/VERIFY_TOKEN';

/* INITIALIZE ROUTER */
const commentRoutes = Router();

commentRoutes.get('', getComments);
commentRoutes.get('/:comment_id', getCommentById);
commentRoutes.post('', VERIFY_TOKEN, addComment);
commentRoutes.put('/:comment_id', VERIFY_TOKEN, updateComment);
commentRoutes.delete('/:comment_id', VERIFY_TOKEN, deleteComment);

export default commentRoutes;
