import { NextFunction, Request, Response } from "express";

export function getIndexPage(req: Request, res: Response) {
  if (req.user) res.render("welcome", { user: req.user });
  else res.render("index");
}

export function getErrorPage(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.render("error", { error });
}
