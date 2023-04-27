import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/session/session.interface";
import { createSessionService } from "../../services/session/sessionUser.service";


export const createSessionController = async (req: Request, res: Response) => {
  const sessionData: IUserLogin = req.body;
  const token = await createSessionService(sessionData);
  return res.status(200).json(token );
};