"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_SCHEMA = void 0;
const joi_1 = __importDefault(require("joi"));
/* VALIDATION SCHEMA */
exports.VALIDATION_SCHEMA = joi_1.default.object({
    display_name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().messages({ "string.pattern.base": "Password does not match pattern..." })
});
