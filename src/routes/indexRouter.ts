import { Router } from "express";
import { registerUser, signIn } from "../controllers/userController";

const indexRouter = Router();

// todo: Basic routes
indexRouter.get("/sign-in", signIn);
indexRouter.post("/sign-in", registerUser);

export default indexRouter;
