import { NextFunction, Request, Response } from "express";
import MessageModel from "../models/MessageModel";

export async function getIndexPage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) return res.render("index");
    const result = await MessageModel.get();
    const messages = result.rows;
    res.render("index", { user: req.user, messages: messages });
  } catch (error) {
    next(error);
  }
}

export function getErrorPage(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("errorPage", { error });
}
