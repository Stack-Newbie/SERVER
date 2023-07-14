/* THIRD PARTY MODULES */
import { Request, Response } from 'express';
/* CUSTOM MODULES */
import { DB_OPERATIONS } from '../helpers/DB-OPERATIONS';


/* EXPORT MODULE | getComments */
export const getComments = async (req: Request, res: Response) => {
    try {
        let comments = await (await DB_OPERATIONS.EXECUTE('getComments')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(comments);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | getCommentById */
export const getCommentById = async (req: Request<{ comment_id: string }>, res: Response) => {
    try {
        /* GET comment_id FROM REQUEST BODY */
        const { comment_id } = req.params;

        let comment = await (await DB_OPERATIONS.EXECUTE('getCommentById', { comment_id })).recordset[0];

        /* CHECK IF comment EXISTS */
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found!'
            });
        }

        /* SUCCESS STATE */
        return res.status(200).json(comment);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | addComment */
export const addComment = async (req: Request, res: Response) => {
    try {
        /* READ Request BODY */
        const { comment, answer_id, user_id } = req.body;

        await DB_OPERATIONS.EXECUTE('addComment', {
            comment, answer_id, user_id
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Comment added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`)
    }
}

/* EXPORT MODULE | updateComment */
export const updateComment = async (req: Request, res: Response) => {
    try {
        /* GET comment_id */
        const { comment_id } = req.params;

        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED comment_id*/
        let original_comment = await (await DB_OPERATIONS.EXECUTE('getCommentById', { comment_id })).recordset[0];

        /* CHECK IF COMMENT EXISTS */
        if (!original_comment) {
            res.status(404).json({
                message: 'Comment not found!'
            });
        }

        /* PROCEED WITH UPDATE IF COMMENT EXISTS */
        const { comment, answer_id, user_id } = req.body;

        await DB_OPERATIONS.EXECUTE('updateComment', {
            comment_id, comment, answer_id, user_id
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Comment updated successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | deleteComment */
export const deleteComment = async (req: Request, res: Response) => {
    try {
        /* GET comment_id */
        const { comment_id } = req.params;
        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED comment_id*/
        let comment = await (await DB_OPERATIONS.EXECUTE('getCommentById', { comment_id })).recordset[0];

        await (await DB_OPERATIONS.EXECUTE('deleteComment', { comment_id }));

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
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}