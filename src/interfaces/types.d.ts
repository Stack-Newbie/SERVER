import { Request } from "express";

interface USER_MODEL {
    user_id: number;
    display_name: string;
    email: string;
    password: string;
}

interface QUESTION_MODEL extends Request {
    body: {
        question: string;
        additional_info: string;
        category: string;
        user_id: number;
    },
    info?: DECODED_DATA
}

interface DECODED_DATA {
    user_id: number;
    display_name: string;
    email: string;
}

interface INFO extends Request {
    info?: DECODED_DATA;
}