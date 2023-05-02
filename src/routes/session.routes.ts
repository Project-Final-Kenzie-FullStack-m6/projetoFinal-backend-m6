import { Router } from "express";
import { createSessionController } from "../controllers/session/sessionUser.controller";
const sessionRouters = Router();

sessionRouters.post("", createSessionController);

export default sessionRouters;
