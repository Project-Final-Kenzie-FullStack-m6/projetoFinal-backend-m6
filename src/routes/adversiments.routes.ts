import { Router } from "express";
import {
	createAdversimentController,
	listAdversimentControler,
	deleteAdversimentController,
	updateAdversimentController,
} from "../controllers/adversiment/adversiment.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import ensureVerifyIsSellerMiddleware from "../middlewares/ensureVerifyIsSeller.middleware";

const adversimentRoutes = Router();

adversimentRoutes.post(
	"",
	ensureAuthMiddleware,
	ensureVerifyIsSellerMiddleware,
	createAdversimentController
);
adversimentRoutes.get("", listAdversimentControler);
adversimentRoutes.get("/:id");
adversimentRoutes.patch(
	"/:id",
	ensureAuthMiddleware,
	updateAdversimentController
);
adversimentRoutes.delete(
	"/:id",
	ensureAuthMiddleware,
	deleteAdversimentController
);
adversimentRoutes.patch("/:id/image");

export default adversimentRoutes;
