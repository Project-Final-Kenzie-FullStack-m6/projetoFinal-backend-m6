import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users/users.interface";
import { userResponse } from "../../serializers/user.serializers";

const listUserInfoService = async (id: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.address", "address")
    .where("user.id = :id", { id })
    .getOne();
  const response = await userResponse.validate(findUser, {
    stripUnknown: true,
  });
  return response;
};
export default listUserInfoService;
