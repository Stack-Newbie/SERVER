"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFY_TOKEN = void 0;
/* CORE MODULES */
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
/* dotenv PATH CONFIG */
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// EXPORT MODULE | VERIFY_TOKEN
const VERIFY_TOKEN = (req, res, next) => {
    try {
        // READ token FROM REQUEST
        const token = req.headers['token'];
        // CHECK IF A TOKEN EXISTS
        if (!token) {
            return res.status(403).json({
                message: 'Unauthorized access!'
            });
        }
        // CHECK IF TOKEN IS VALID AND OR EXPIRED
        const DECODED_DATA = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        // READ DECODED INFORMATION FROM REQUEST
        req.info = DECODED_DATA;
    }
    catch (error) {
        // FORBIDDEN : Deny user access if the request body 
        // does not contain a valid token
        res.status(403).json(`ERROR: ${error.message}`);
    }
    // CALL NEXT FUNCTION IN ORDER TO LET THE REQUEST PROCEED
    next();
};
exports.VERIFY_TOKEN = VERIFY_TOKEN;
