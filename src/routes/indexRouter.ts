import { Router } from "express";
import {
  addUserToLocals,
  joinClub,
  joinUserToClub,
  logIn,
  logOut,
  logOutUser,
  registerUser,
  signIn,
} from "../controllers/userController";
import { getErrorPage, getIndexPage } from "../controllers/indexController";
import passport from "passport";
import {
  getNewMessageForm,
  sendNewMessage,
} from "../controllers/messageController";

const indexRouter = Router();

indexRouter.use(addUserToLocals);
indexRouter.use(getErrorPage);

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
indexRouter.post("/join-club", joinUserToClub);

indexRouter.get("/new-message", getNewMessageForm);
indexRouter.post("/new-message", sendNewMessage);

export default indexRouter;
