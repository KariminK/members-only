// TODO: make controllers for user

import { Request, Response } from "express";

export function signIn(req: Request, res: Response) {
  res.render("sign-in");
}
