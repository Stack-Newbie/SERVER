/* THIRD PARTY MODULES */
import { Request, Response } from 'express';
/* CUSTOM MODULES */
import { DB_OPERATIONS } from '../helpers/DB-OPERATIONS';


/* EXPORT MODULE | getAnswers */
export const getAnswers = async (req: Request, res: Response) => {
    try {
        let answers = await (await DB_OPERATIONS.EXECUTE('getAnswers')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(answers);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | getAnswerById */
export const getAnswerById = async (req: Request<{ answer_id: string }>, res: Response) => {
    try {
        /* GET answer_id FROM REQUEST BODY */
        const { answer_id } = req.params;

        let answer = await (await DB_OPERATIONS.EXECUTE('getAnswerById', { answer_id })).recordset[0];

        /* CHECK IF answer EXISTS */
        if (!answer) {
            return res.status(404).json({
                message: 'Answer not found!'
            });
        }

        /* SUCCESS STATE */
        return res.status(200).json(answer);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | addAnswer */
export const addAnswer = async (req: Request, res: Response) => {
    try {
        /* READ Request BODY */
        const { answer, question_id, user_id, display_name } = req.body;

        await DB_OPERATIONS.EXECUTE('addAnswer', {
            answer, question_id, user_id, display_name
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Answer added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`)
    }
}

/* EXPORT MODULE | updateAnswer */
export const updateAnswer = async (req: Request, res: Response) => {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;

        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED answer_id*/
        let original_answer = await (await DB_OPERATIONS.EXECUTE('getAnswerById', { answer_id })).recordset[0];

        /* CHECK IF COMMENT EXISTS */
        if (!original_answer) {
            res.status(404).json({
                message: 'Answer not found!'
            });
        }

        /* PROCEED WITH UPDATE IF COMMENT EXISTS */
        const { answer, question_id, user_id, display_name } = req.body;

        await DB_OPERATIONS.EXECUTE('updateAnswer', {
            answer_id, question_id, answer, user_id, display_name
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'Answer updated successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | deleteAnswer */
export const deleteAnswer = async (req: Request, res: Response) => {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;
        /*RETRIEVE COMMENT FROM DATABSE USING ASSIGNED answer_id*/
        let answer = await (await DB_OPERATIONS.EXECUTE('getAnswerById', { answer_id })).recordset[0];

        await (await DB_OPERATIONS.EXECUTE('deleteAnswer', { answer_id }));

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
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | upvoteAnswer */
export const upVoteAnswer = async (req: Request, res: Response) => {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;
        /* READ req.body */
        const { user_id, vote_type } = req.body;

        /* INSERT VOTE */
        await DB_OPERATIONS.EXECUTE('InsertVote', {
            answer_id,
            user_id,
            vote_type
        });

        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Answer upvoted!'
        });

    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | upvoteAnswer */
export const downVoteAnswer = async (req: Request, res: Response) => {
    try {
        /* GET answer_id */
        const { answer_id } = req.params;
        /* READ req.body */
        const { user_id, vote_type } = req.body;

        /* INSERT VOTE */
        await DB_OPERATIONS.EXECUTE('InsertVote', {
            answer_id,
            user_id,
            vote_type
        });

        /* SUCCESS STATE */
        res.status(200).json({
            message: 'Answer downvoted!'
        });

    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}