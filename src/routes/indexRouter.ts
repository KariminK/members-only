import { Router } from "express";
import {
  addUserToLocals,
  joinClub,
  logIn,
  logOut,
  logOutUser,
  registerUser,
  signIn,
} from "../controllers/userController";
import { getIndexPage } from "../controllers/indexController";
import passport from "passport";

const indexRouter = Router();

indexRouter.use(addUserToLocals);

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

indexRouter.get("/log-out", logOut);
indexRouter.post("/log-out", logOutUser);

indexRouter.get("/join-club", joinClub);

export default indexRouter;
