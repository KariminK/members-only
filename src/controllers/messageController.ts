import { Request, Response } from "express";

export function getNewMessageForm(req: Request, res: Response) {
  res.render("new-message");
}
