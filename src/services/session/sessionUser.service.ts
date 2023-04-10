import { IUserLogin } from "../../interfaces/session/session.interface";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import "dotenv/config";
import AppError from "../../errors/AppError";
import { User } from "../../entities/user.entity";

export const createSessionService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: email },
    withDeleted: true,
  });

  if (!user) {
    throw new AppError("User or password invalid", 401);
  }

  if (user.isActive == false) {
    throw new AppError("User invalid", 401);
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError("User or password invalid", 401);
  }

  const token = jwt.sign(
    {
      isActive: user.isActive,
      isSeller: user.isSeller,
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};
