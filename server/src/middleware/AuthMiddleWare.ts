import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
   const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader ===null || !authHeader === undefined) {
         return res.status(401).json({ errors: { token: "No token, authorization denied" } });      
    }

   const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ errors :  { token: "No token, authorization denied" } });
    }

   //verify token
   jwt.verify{token, process.env.JWT_SECRET_KEY!, (err, user) => {
        if (err) {
            return res.status(401).json({ errors: { token: "
                Token is not valid" } });
                req.user

   }}
   
    // const token = req.header("x-auth-token");
    // if (!token) {
    //     return res.status(401).json({ errors: { token
    //         : "No token, authorization denied" } });
    // }
    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    //     req.user = decoded;
    //     next();
    // } catch (error) {
    //     res.status(401).json({ errors
    //         : { token: "Token is not
    //         valid" } });
    // }
}