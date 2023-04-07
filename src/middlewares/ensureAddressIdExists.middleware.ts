import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";

const ensureAddressIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const addressId = req.params.id || req.body.addressId;

  const addressRepository = AppDataSource.getRepository(Address);

  const findAddress = await addressRepository.findOneBy({
    id: addressId,
  });

  if (!findAddress) {
    throw new AppError("AddressID not exists", 404);
  }

  return next();
};

export default ensureAddressIdExistsMiddleware;
