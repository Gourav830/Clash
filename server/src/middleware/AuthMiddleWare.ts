import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers?.authorization;
  if (!authHeader) {
    res.status(401).json({ status: 401, message: "UnAuthorized" });
    return;
  }
  const token = authHeader.split(" ")[1];

  //   * Verify the JWT token
  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!,
    (
      err: jwt.VerifyErrors | null,
      decoded: string | jwt.JwtPayload | undefined
    ) => {
      if (err) {
        res.status(401).json({ status: 401, message: "UnAuthorized" });
        return;
      }

      req.user = decoded as AuthUser;
      next();
    }
  );
};

export default authMiddleware;
