// TODO: make controllers for user

import { Request, Response } from "express";
import { body, ValidationChain } from "express-validator";
import passport from "passport";

export function signIn(req: Request, res: Response) {
  res.render("sign-in");
}

const registerUserValidation: ValidationChain[] = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email shouldn't be empty")
    .isEmail()
    .withMessage("Invalid Email"),
  body("fname")
    .trim()
    .notEmpty()
    .withMessage("First name shouldn't be empty")
    .isString()
    .withMessage("First name should be string")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name should be between 3 and 20 characters"),
  body("lname")
    .trim()
    .notEmpty()
    .withMessage("Last name shouldn't be empty")
    .isString()
    .withMessage("Last name should be string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name should be between 3 and 20 characters"),
  body("password").trim().notEmpty().withMessage("Password can't be empty"),
];
export const registerUser = [];
