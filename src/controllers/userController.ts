// TODO: make controllers for user

import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import UserModel from "../models/UserModel";
import passport from "passport";

// sign-in get
export function signIn(req: Request, res: Response) {
  res.render("sign-in");
}
export function addUserToLocals(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.user = req.user;
  next();
}

// sign-in post
const validateEmail = () =>
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email shouldn't be empty")
    .isEmail()
    .withMessage("Invalid Email");

const validateName = (field: string, name: string) =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${name} shouldn't be empty`)
    .isString()
    .withMessage(`${name} should be string`)
    .isLength({ min: 3, max: 20 })
    .withMessage(`${name} should be between 3 and 20 characters`);

const registerUserValidation: ValidationChain[] = [
  validateEmail(),
  validateName("first_name", "First name"),
  validateName("last_name", "Last name"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password can't be empty")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 chars length and must contain at least one number, lowercase letter, uppercase letter, and symbol"
    )
    .custom((input, { req }) => {
      return input === req.body.confirmPassword;
    })
    .withMessage("Passwords must be the same"),
];

function registerUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.render("sign-in", { errors: errors.array() });

    const user = req.body;
    bcrypt.hash(user.password, 10, async (err, hash) => {
      if (err) return next(err);
      if (!user.admin) await UserModel.createUser({ ...user, password: hash });
      else await UserModel.createAdmin({ ...user, password: hash });
      console.log("[log] new user created");
      res.redirect("/");
    });
  } catch (error) {
    return next(error);
  }
}

export const registerUser = [...registerUserValidation, registerUserHandler];

// log in
export function logIn(req: Request, res: Response) {
  res.render("log-in");
}

export function logOut(req: Request, res: Response) {
  res.render("log-out");
}

export function logOutUser(req: Request, res: Response, next: NextFunction) {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
}

export function joinClub(req: Request, res: Response) {
  res.render("join-club");
}

const joinPasswordValidation = body("password")
  .isEmpty()
  .withMessage("Password shouldn't be empty")
  .custom((input) => {
    return input === "50Cent";
  })
  .withMessage("Invalid password");

export async function joinUserToClub(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.render("join-club", { errors: error.array() });
    if (req.user?.status === "member") return res.redirect("/");
    if (req.user?.id) await UserModel.updateUserStatus(req.user?.id, "member");
    res.redirect("/");
  } catch (error) {
    return next(error);
  }
}
