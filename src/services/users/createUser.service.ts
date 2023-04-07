import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IUser, IUserRequest } from "../../interfaces/users/users.interface";
import { userResponse } from "../../serializers/user.serializers";

const createUserService = async (userData: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  console.log(userData);
  const email = userData.email;

  const emailUnavailable = await userRepository.findOneBy({
    email: email,
  });

  if (emailUnavailable) {
    throw new AppError("User already exists", 409);
  }

  const user = userRepository.create(userData);
  await userRepository.save(user);

  const response = await userResponse.validate(user, {
    stripUnknown: true,
  });

  return response;
};

export default createUserService;
