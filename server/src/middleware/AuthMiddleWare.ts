import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthUser } from "../custom-types.d.js";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res
      .status(401)
      .json({ errors: { token: "No token, authorization denied" } });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ errors: { token: "No token, authorization denied" } });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
    if (err) {
      return res
        .status(401)
        .json({ errors: { token: "Token is not valid" } });
    }

    req.user = user as AuthUser;
    next();
  });
};

export default authMiddleware;
