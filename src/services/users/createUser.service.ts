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

  const newAddress = addressRepository.create(userData.address);
  await addressRepository.save(newAddress);

  const newUser = userRepository.create({ ...userData, address: newAddress });
  await userRepository.save(newUser);

  const newResponse = { ...newUser, newAddress };

  const response = await userResponse.validate(newResponse, {
    stripUnknown: true,
  });

  return response;
};

export default createUserService;