import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import * as yup from "yup";
import AppError from "../errors/AppError";

export const ensureIdIsValidMiddleware =
  (entity: any) => async (req: Request, res: Response, next: NextFunction) => {
    const testUuid = yup.string().uuid("This id is invalid");

    const id = req.params.id;

    await testUuid.validate(id);

    const repository = AppDataSource.getRepository(entity);

    const idData = await repository.findOne({
      where: { id: id },
      withDeleted: true,
    });

    if (!idData) {
      throw new AppError("This id not exists", 404);
    }

    return next();
  };