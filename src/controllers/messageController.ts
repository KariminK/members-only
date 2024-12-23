import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import MessageModel from "../models/MessageModel";

export function getNewMessageForm(req: Request, res: Response) {
  res.render("new-message");
}

const newMessageValidation = body("text")
  .trim()
  .notEmpty()
  .withMessage("Message's text cannot be empty")
  .isLength({ max: 500 })
  .withMessage("Message must has less than 500 characters");

async function sendNewMessageHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.render("new-message", { errors: errors.array() });
    const { text } = req.body;
    if (req.user?.id) await MessageModel.send(text, req.user.id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

export async function deleteMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    console.log(id);

    await MessageModel.deleteMessage(id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

export const sendNewMessage = [newMessageValidation, sendNewMessageHandler];
