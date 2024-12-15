import { Router } from "express";
import { registerUser, signIn } from "../controllers/userController";
import { getIndexPage } from "../controllers/indexController";

const indexRouter = Router();

// todo: Basic routes
indexRouter.get("/", getIndexPage);
indexRouter.get("/sign-in", signIn);
indexRouter.post("/sign-in", registerUser);

export default indexRouter;
