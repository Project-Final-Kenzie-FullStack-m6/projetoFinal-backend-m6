import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  user.isActive = false;
  await userRepository.save(user);

  return {};
};

export default deleteUserService;
