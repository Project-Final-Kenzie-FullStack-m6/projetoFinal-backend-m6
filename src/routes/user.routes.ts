import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import {
	createUserController,
	deleteUserController,
	listUserControler,
	resetPasswordController,
	sendResetEmailPasswordController,
	updateUserController,
} from "../controllers/users/users.controllers";
import ensureVerifyDataMiddleware from "../middlewares/ensureVerifyData.middleware";
import {userRequestSeriallizer} from "../serializers/user.serializers"


const useRoutes = Router();

useRoutes.post("/resetPassword", sendResetEmailPasswordController);
useRoutes.post("", ensureVerifyDataMiddleware(userRequestSeriallizer),createUserController);
useRoutes.get("", ensureAuthMiddleware,listUserControler);

useRoutes.patch("", ensureAuthMiddleware, updateUserController);
useRoutes.patch("/:id/address");
useRoutes.patch("/resetPassword/:token", resetPasswordController);
useRoutes.delete("", ensureAuthMiddleware, deleteUserController);

export default useRoutes;
