import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { v4 as uuidv4 } from "uuid";
import { emailService } from "../../utils/sendEmail.utils";

const sendResetEmailPasswordService = async (
	email: string,
	protocol: string,
	host: string
) => {
	const userRepository = AppDataSource.getRepository(User);
	const user = await userRepository.findOne({ where: { email } });

	if (!user) {
		throw new AppError("user not found", 404);
	}

	const resetToken = uuidv4();

	await userRepository.update({ email }, { resetToken: resetToken });

	const resetPasswordTemplate = emailService.resetPasswordTemplate(
		email,
		user.name,
		protocol,
		host,
		resetToken
	);

	await emailService.sendEmail(resetPasswordTemplate);
};
export default sendResetEmailPasswordService;
