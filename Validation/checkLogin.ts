import { NextFunction, Request, Response } from "express";
import { compareToken } from "../modules/utils";

type Headers = {
  authorization: string
};

declare module 'express-serve-static-core' {
  interface Request {
    headers: Headers;
  }
};

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const user: any = compareToken(req.headers.authorization.slice(7))
    req.username = user.data
    next();
  } catch (error: unknown) {
    next({ status: 401, message: "لطفا وارد حساب کاریری خود شوید" });
  }
};


export default checkLogin;