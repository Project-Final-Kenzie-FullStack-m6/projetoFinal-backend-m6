import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import AppDataSource from "../data-source";
import { Adversiment } from "../entities/adversiments.entity";

const ensureAdversimentIdExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adversimentId = req.params.id || req.body.adversimentId;

  const adversimentRepository = AppDataSource.getRepository(Adversiment);

  const findAdversiment = await adversimentRepository.findOneBy({
    id: adversimentId,
  });

  if (!findAdversiment) {
    throw new AppError("AdversimentID not exists", 404);
  }

  return next();
};

export default ensureAdversimentIdExistsMiddleware;
