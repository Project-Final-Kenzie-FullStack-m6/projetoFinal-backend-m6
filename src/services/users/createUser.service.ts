import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import AppError from "../../errors/AppError";
import { IUser, IUserRequest } from "../../interfaces/users/users.interface";
import { userResponse } from "../../serializers/user.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const email = userData.email;

  const emailUnavailable = await userRepository.findOneBy({
    email: email,
  });

  if (emailUnavailable) {
    throw new AppError("User already exists", 409);
  }

  const address = addressRepository.create(userData.address);
  await addressRepository.save(address);

  const newUser = userRepository.create({ ...userData, address: address });
  await userRepository.save(newUser);

  const response = await userResponse.validate(newUser, {
    stripUnknown: true,
  });

  return response;
};

export default createUserService;
