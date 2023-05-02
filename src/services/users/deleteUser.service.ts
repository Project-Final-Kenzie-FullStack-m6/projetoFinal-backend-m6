import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";

const deleteUserService = async (id: string):Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: id,
  });

  if(!user){
    throw new AppError("This user not exists", 404);
  }

  user.isActive = false;
  await userRepository.save(user);

};

export default deleteUserService;
