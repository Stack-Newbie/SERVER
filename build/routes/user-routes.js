"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
/* INITIALIZE ROUTER */
const userRoutes = (0, express_1.Router)();
userRoutes.get('', user_controller_1.getUsers);
userRoutes.get('/:user_id', user_controller_1.getUserById);
userRoutes.post('', user_controller_1.addUser);
userRoutes.put('/:user_id', user_controller_1.updateUser);
userRoutes.delete('/:user_id', user_controller_1.deleteUser);
exports.default = userRoutes;
