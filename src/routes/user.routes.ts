import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import {
  createUserController,
  deleteUserController,
  listUserControler,
  updateUserController,
} from "../controllers/users/users.controllers";
const useRoutes = Router();

useRoutes.post("", createUserController);
useRoutes.get("", ensureAuthMiddleware, listUserControler);
useRoutes.get("/:id");
useRoutes.patch("", ensureAuthMiddleware, updateUserController);
useRoutes.patch(":/id/address");
useRoutes.delete("", ensureAuthMiddleware, deleteUserController);

export default useRoutes;
