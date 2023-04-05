import { Router } from "express";

const adversimentRoutes = Router();

adversimentRoutes.post("")
adversimentRoutes.get("")
adversimentRoutes.get("/:id")
adversimentRoutes.patch("/:id")
adversimentRoutes.delete("/:id")
adversimentRoutes.patch("/:id/image")

export default adversimentRoutes;
