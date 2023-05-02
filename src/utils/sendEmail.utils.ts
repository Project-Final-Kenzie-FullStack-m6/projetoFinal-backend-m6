import { createTransport } from "nodemailer";
import { ISendEmailRequest } from "../interfaces/resetEmail/resetEmail.interface";
import "dotenv/config";
import AppError from "../errors/AppError";
import Mailgen from "mailgen";

class EmailService {
	async sendEmail({ to, subject, text }: ISendEmailRequest) {
		const tranporter = createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		await tranporter
			.sendMail({
				from: "g34t13@gmail.com",
				to,
				subject,
				html: text,
			})
			.then(() => {
				console.log("Email send with sucess");
			})
			.catch((err) => {
				console.log(err);
				throw new AppError("Error sending email, try again later", 500);
			});
	}

	resetPasswordTemplate(
		userEmail: string,
		userName: string,
		protocol: string,
		host: string,
		resetToken: string
	) {
		const mailGenerator = new Mailgen({
			theme: "default",
			product: {
				name: "M6 G34 T13",
				link: `${protocol}://${host}`,
			},
		});

		const email = {
			body: {
				name: userName,
				intro: "Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.",
				action: {
					instructions:
						"Clique no botão abaixo para redefinir sua senha:",
					button: {
						color: "#DC4D2F",
						text: "Redefina sua senha",
						link: `http://localhost:3000/resetPassword/?token=${resetToken}`,
					},
				},
				outro: "Se você não solicitou uma redefinição de senha, nenhuma outra ação será necessária de sua parte.",
			},
		};

		const emailBody = mailGenerator.generate(email);

		const emailTemplate = {
			to: userEmail,
			subject: "Redefinição de senha",
			text: emailBody,
		};

		return emailTemplate;
	}
}

const emailService = new EmailService();

export { emailService };
