"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
// INITIALIZE ROUTER
const authenticationRoutes = (0, express_1.Router)();
authenticationRoutes.post('/sign-in', user_controller_1.signInUser);
exports.default = authenticationRoutes;
