import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import {
	createCommentController,
	deleteCommentController,
	listCommentController,
	updateCommentController,
} from "../controllers/comment/comment.controller";

const commentRoutes = Router();

commentRoutes.post("/:id", ensureAuthMiddleware, createCommentController);
commentRoutes.get("/:id", listCommentController);
commentRoutes.patch("/:id", ensureAuthMiddleware, updateCommentController);
commentRoutes.delete("/:id", ensureAuthMiddleware, deleteCommentController);

export default commentRoutes;
