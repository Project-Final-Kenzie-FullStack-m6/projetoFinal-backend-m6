import { hashSync, genSalt } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserUpdate } from "../../interfaces/users/users.interface";
import { userResponse } from "../../serializers/user.serializers";

const updateUserService = async (
  id: string,
  data: IUserUpdate
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: id,
  });

  if (data.password) {
    const salt = await genSalt(10);
    data.password = await hashSync(data.password, salt);
  }

  const updatedUser = userRepository.create({
    ...user,
    ...data,
  });
  await userRepository.save(updatedUser);

  const response = await userResponse.validate(updatedUser, {
    stripUnknown: true,
  });

  return response;
};

export default updateUserService;
