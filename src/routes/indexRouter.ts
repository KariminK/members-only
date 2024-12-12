import { Router } from "express";
import { signIn } from "../controllers/userController";

const indexRouter = Router();

// todo: Basic routes
indexRouter.get("/sign-in", signIn);

export default indexRouter;
