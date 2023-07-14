import { Router } from "express";
import { signInUser } from "../controllers/user-controller";

// INITIALIZE ROUTER
const authenticationRoutes = Router();

authenticationRoutes.post('/sign-in', signInUser);

export default authenticationRoutes;