import { Request, Response } from "express";

export function getIndexPage(req: Request, res: Response) {
  if (req.user) res.render("welcome", { user: req.user });
  else res.render("index");
}
