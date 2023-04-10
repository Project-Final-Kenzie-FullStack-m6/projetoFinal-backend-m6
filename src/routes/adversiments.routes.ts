import { Router } from "express";
import {createAdversimentController, listAdversimentControler, deleteAdversimentController, uptadeAdversimentController} from "../controllers/adversiment/adversiment.controller";

const adversimentRoutes = Router();

adversimentRoutes.post("", createAdversimentController)
adversimentRoutes.get("", listAdversimentControler)
adversimentRoutes.get("/:id")
adversimentRoutes.patch("/:id",uptadeAdversimentController)
adversimentRoutes.delete("/:id", deleteAdversimentController)
adversimentRoutes.patch("/:id/image")

export default adversimentRoutes;
