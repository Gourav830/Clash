import jwt from "jsonwebtoken";
import {  Response, NextFunction } from "express";

const authMiddleware = (req: any, res: Response, next: NextFunction):void => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
     res.status(401).json({ status: 401, message: "UnAuthorized" });
    return;
  }
  const token = authHeader.split(" ")[1];

  //   * Verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err:any, user:any) => {
    if (err){
       res.status(401).json({ status: 401, message: "UnAuthorized" });
      return;
      }

    req.user = user as AuthUser;
    next();
  });
};

export default authMiddleware;
