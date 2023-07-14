import { Router } from "express";
import { addUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user-controller";

/* INITIALIZE ROUTER */
const userRoutes = Router();

userRoutes.get('', getUsers);
userRoutes.get('/:user_id', getUserById);
userRoutes.post('', addUser);
userRoutes.put('/:user_id', updateUser);
userRoutes.delete('/:user_id', deleteUser);

export default userRoutes; 