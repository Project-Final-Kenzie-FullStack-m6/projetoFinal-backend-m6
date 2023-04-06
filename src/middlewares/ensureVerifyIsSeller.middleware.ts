import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const ensureVerifyIsSellerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { isSeller } = req.user;

  if (!isSeller) {
    throw new AppError("Missing seller permissions", 401);
  }

  next();
};

export default ensureVerifyIsSellerMiddleware;
