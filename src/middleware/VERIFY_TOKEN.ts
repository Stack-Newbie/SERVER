/* CORE MODULES */
import path from "path";
/* THIRD PARTY MODULES */
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
/* dotenv PATH CONFIG */
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
/* INTERFACES */
import { INFO, DECODED_DATA } from "../interfaces/types";
 

// EXPORT MODULE | VERIFY_TOKEN
export const VERIFY_TOKEN = (req: INFO, res: Response, next: NextFunction) => {
    try {
        // READ token FROM REQUEST
        const token = req.headers['token'] as string;
        // CHECK IF A TOKEN EXISTS
        if (!token) {
            return res.status(403).json({
                message: 'Unauthorized access!'
            });
        }
        // CHECK IF TOKEN IS VALID AND OR EXPIRED
        const DECODED_DATA = jwt.verify(token, process.env.SECRET_KEY as string) as DECODED_DATA;
        // READ DECODED INFORMATION FROM REQUEST
        req.info = DECODED_DATA;

    } catch (error: any) {
        // FORBIDDEN : Deny user access if the request body 
        // does not contain a valid token
        res.status(403).json(`ERROR: ${error.message}`);
    }
    // CALL NEXT FUNCTION IN ORDER TO LET THE REQUEST PROCEED
    next();
} 