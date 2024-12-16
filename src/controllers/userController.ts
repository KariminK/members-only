// TODO: make controllers for user

import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";
import UserModel from "../models/UserModel";

// sign-in get
export function signIn(req: Request, res: Response) {
  res.render("sign-in");
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
    ),
];

function registerUserHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.render("sign-in", { errors: errors.array() });

    const user: Express.User = req.body;
    bcrypt.hash(user.password, 10, async (err, hash) => {
      if (err) return next(err);
      await UserModel.createUser({ ...user, password: hash });
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
