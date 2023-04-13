import { hashSync, genSalt } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Address } from "../../entities/address.entity";
import { IUser, IUserUpdate } from "../../interfaces/users/users.interface";
import { userResponse } from "../../serializers/user.serializers";

const updateUserService = async (
  id: string,
  data: IUserUpdate
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);
  const user = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.address", "address")
    .where("user.id = :id", { id })
    .getOne();

  if (!user) {
    throw new Error("User not found");
  }

  if (data.password) {
    const salt = await genSalt(10);
    data.password = await hashSync(data.password, salt);
  }

  if (data.address) {
    const newAddress = data.address;
    const updatedAddress = { ...user.address, ...newAddress };
    await addressRepository.save(updatedAddress);
  }

  const findNewAddress = await addressRepository.findOneBy({
    id: user.address.id,
  });

  const updatedUser = {
    ...user,
    ...data,
    address: findNewAddress,
  };

  await userRepository.save(updatedUser);

  const response = await userResponse.validate(updatedUser, {
    stripUnknown: true,
  });

  return response;
};

export default updateUserService;
