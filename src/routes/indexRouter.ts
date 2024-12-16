import { Router } from "express";
import { logIn, registerUser, signIn } from "../controllers/userController";
import { getIndexPage } from "../controllers/indexController";
import passport from "passport";

const indexRouter = Router();

// todo: Basic routes
indexRouter.get("/", getIndexPage);

indexRouter.get("/sign-in", signIn);
indexRouter.post("/sign-in", registerUser);

indexRouter.get("/log-in", logIn);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/dw",
  })
);

export default indexRouter;
