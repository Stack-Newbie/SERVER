/* CORE MODULES */
import path from "path";
/* THIRD PARTY MODULES */
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
/* dotenv PATH CONFIG */
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
/* CUSTOM MODULES */
import { DB_OPERATIONS } from '../helpers/DB-OPERATIONS';
import { VALIDATION_SCHEMA } from '../helpers/LOGIN-VALIDATION';
import { USER_MODEL } from "../interfaces/types";

/* EXPORT MODULE | getUsers */
export const getUsers = async (req: Request, res: Response) => {
    try {
        let users = await (await DB_OPERATIONS.EXECUTE('getUsers')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(users);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | getUserById */
export const getUserById = async (req: Request<{ user_id: string }>, res: Response) => {
    try {
        /* GET user_id FROM REQUEST BODY */
        const { user_id } = req.params;

        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];

        /* CHECK IF user EXISTS */
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        /* SUCCESS STATE */
        return res.status(200).json(user);
    } catch (error: any) {
        res.json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | addUser */
export const addUser = async (req: Request, res: Response) => {
    try {
        /* READ Request BODY */
        const { display_name, email, password } = req.body;
        /* VALIDATION */
        const { error } = VALIDATION_SCHEMA.validate(req.body);
        /* THROW ERROR IF VALIDATION FAILS */
        if (error) {
            return res.status(404).json(error.details[0].message);
        }

        /* HASH PASSWORD */
        const hashed_password = await bcrypt.hash(password, 10);

        await DB_OPERATIONS.EXECUTE('addUser', {
            display_name,
            email,
            password: hashed_password
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'User added successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`)
    }
}

/* EXPORT MODULE | updateUser */
export const updateUser = async (req: Request, res: Response) => {
    try {
        /* GET user_id */
        const { user_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED user_id*/
        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];

        /* CHECK IF USER EXISTS */
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }

        /* PROCEED WITH UPDATE IF USER EXISTS */
        const { display_name, email, password } = req.body;

        /* HASH PASSWORD */
        const hashed_password = await bcrypt.hash(password, 10);

        await DB_OPERATIONS.EXECUTE('updateUser', {
            user_id, display_name, email, password: hashed_password
        });

        /* SUCCESS STATE */
        res.status(201).json({
            message: 'User updated successfully!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | deleteUser */
export const deleteUser = async (req: Request, res: Response) => {
    try {
        /* GET user_id */
        const { user_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED user_id*/
        let user = await (await DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];

        await (await DB_OPERATIONS.EXECUTE('deleteUser', { user_id }));

        /* CHECK IF USER EXISTS */
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }

        /* SUCCESS STATE */
        res.status(200).json({
            message: 'User deleted!'
        });
    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}

/* EXPORT MODULE | signInnUser */
export const signInUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email: string, password: string };

        const user = await (await DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset;

        /* CHECK IF USER EXISTS */
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        /* VALIDATE PASSWORD */
        const valid_password = await bcrypt.compare(password, user[0].password);

        /* IF THE PASSWORD IS INVALID */
        if (!valid_password) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }

        /* CREATE PAYLOAD */
        const payload = user.map(USER_INFO => {
            const { password, ...rest } = USER_INFO;
            const isAdmin = USER_INFO.admin === 1 ? true : false;
            return {
                ...rest,
                user_id: USER_INFO.user_id,
                admin: isAdmin,
                display_name: USER_INFO.display_name
            };
        });

        /* GENERATE TOKEN AND ASSIGN IT TO A USER */
        const TOKEN = JWT.sign(payload[0], process.env.SECRET_KEY as string, { expiresIn: '360000s' });

        return res.status(200).json({
            message: 'User signed in successfully!',
            TOKEN
        });

    } catch (error: any) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
}