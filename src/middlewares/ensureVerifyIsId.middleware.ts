import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import { checkUUID } from "../scripts";

const ensureVerifyIsIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.params.id) {
    const isParamsID = checkUUID({ uuid: req.params.id });

    if (!isParamsID) {
      throw new AppError("Incorrect id format", 400);
    }
  }

  let isBodyUUID: any;
  Object.keys(req.body).forEach((field) => {
    if (field.match(/(.*)Id$/)) {
      isBodyUUID = checkUUID({ uuid: req.body[field] });

      if (!isBodyUUID) {
        throw new AppError("Incorrect id format", 400);
      }
      return;
    }
  });

  return next();
};

export default ensureVerifyIsIdMiddleware;
