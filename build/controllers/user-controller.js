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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUserById = exports.getUsers = void 0;
/* CORE MODULES */
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
/* dotenv PATH CONFIG */
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
/* CUSTOM MODULES */
const DB_OPERATIONS_1 = require("../helpers/DB-OPERATIONS");
const LOGIN_VALIDATION_1 = require("../helpers/LOGIN-VALIDATION");
/* EXPORT MODULE | getUsers */
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUsers')).recordset;
        /* SUCCESS STATE */
        res.status(200).json(users);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getUsers = getUsers;
/* EXPORT MODULE | getUserById */
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET user_id FROM REQUEST BODY */
        const { user_id } = req.params;
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];
        /* CHECK IF user EXISTS */
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        /* SUCCESS STATE */
        return res.status(200).json(user);
    }
    catch (error) {
        res.json(`ERROR: ${error.message}`);
    }
});
exports.getUserById = getUserById;
/* EXPORT MODULE | addUser */
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* READ Request BODY */
        const { display_name, email, password } = req.body;
        /* VALIDATION */
        const { error } = LOGIN_VALIDATION_1.VALIDATION_SCHEMA.validate(req.body);
        /* THROW ERROR IF VALIDATION FAILS */
        if (error) {
            return res.status(404).json(error.details[0].message);
        }
        /* HASH PASSWORD */
        const hashed_password = yield bcrypt_1.default.hash(password, 10);
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('addUser', {
            display_name,
            email,
            password: hashed_password
        });
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'User added successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.addUser = addUser;
/* EXPORT MODULE | updateUser */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET user_id */
        const { user_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED user_id*/
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];
        /* CHECK IF USER EXISTS */
        if (!user) {
            res.status(404).json({
                message: 'User not found!'
            });
        }
        /* PROCEED WITH UPDATE IF USER EXISTS */
        const { display_name, email, password } = req.body;
        /* HASH PASSWORD */
        const hashed_password = yield bcrypt_1.default.hash(password, 10);
        yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('updateUser', {
            user_id, display_name, email, password: hashed_password
        });
        /* SUCCESS STATE */
        res.status(201).json({
            message: 'User updated successfully!'
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.updateUser = updateUser;
/* EXPORT MODULE | deleteUser */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* GET user_id */
        const { user_id } = req.params;
        /*RETRIEVE USER FROM DATABSE USING ASSIGNED user_id*/
        let user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserById', { user_id })).recordset[0];
        yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('deleteUser', { user_id }));
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
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.deleteUser = deleteUser;
/* EXPORT MODULE | signInnUser */
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield (yield DB_OPERATIONS_1.DB_OPERATIONS.EXECUTE('getUserByEmail', { email })).recordset;
        /* CHECK IF USER EXISTS */
        if (!user) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        /* VALIDATE PASSWORD */
        const valid_password = yield bcrypt_1.default.compare(password, user[0].password);
        /* IF THE PASSWORD IS INVALID */
        if (!valid_password) {
            return res.status(404).json({
                message: 'User not found!'
            });
        }
        /* CREATE PAYLOAD */
        const payload = user.map(USER_INFO => {
            const { password } = USER_INFO, rest = __rest(USER_INFO, ["password"]);
            const isAdmin = USER_INFO.admin === 1 ? true : false;
            return Object.assign(Object.assign({}, rest), { user_id: USER_INFO.user_id, admin: isAdmin, display_name: USER_INFO.display_name });
        });
        /* GENERATE TOKEN AND ASSIGN IT TO A USER */
        const TOKEN = jsonwebtoken_1.default.sign(payload[0], process.env.SECRET_KEY, { expiresIn: '360000s' });
        return res.status(200).json({
            message: 'User signed in successfully!',
            TOKEN
        });
    }
    catch (error) {
        res.status(500).json(`ERROR: ${error.message}`);
    }
});
exports.signInUser = signInUser;
