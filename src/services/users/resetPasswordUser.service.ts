import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";

import { hashSync } from "bcryptjs";

const resetPasswordService = async (password: string, resetToken: string) => {
	const userRepository = AppDataSource.getRepository(User);
	const user = await userRepository.findOne({
		where: { resetToken: resetToken },
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	await userRepository.update(user.id, {
		password: hashSync(password, 10),
		resetToken: null,
	});
};
export default resetPasswordService;
