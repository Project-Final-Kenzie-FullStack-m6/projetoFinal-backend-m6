import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import {
  createUserController,
  deleteUserController,
  listUserControler,
  updateUserController,
} from "../controllers/users/users.controllers";
import ensureVerifyDataMiddleware from "../middlewares/ensureVerifyData.middleware";
import {userRequestSeriallizer} from "../serializers/user.serializers"


const useRoutes = Router();

useRoutes.post("", ensureVerifyDataMiddleware(userRequestSeriallizer),createUserController);
useRoutes.get("", ensureAuthMiddleware,listUserControler);
useRoutes.patch("", ensureAuthMiddleware, updateUserController);
useRoutes.patch(":/id/address");
useRoutes.delete("", ensureAuthMiddleware, deleteUserController);

export default useRoutes;
