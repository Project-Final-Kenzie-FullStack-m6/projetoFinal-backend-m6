import { Request, Response } from "express";
import {
	IAdversimentRequest,
	IAdversimentUpdate,
} from "../../interfaces/adversiments/adversiments.interface";

//**impor dos services */
import createAdversimentService from "../../services/adversiments/createAdversiment.service";
import listAdversimentService from "../../services/adversiments/listAdversiment.service";
import deleteAdversimentService from "../../services/adversiments/deleteAdversiment.service";
import updateAdversimentService from "../../services/adversiments/updateAdversiment.service";
import retrieveAdversimentService from "../../services/adversiments/retrieveAdversiment.service";

const createAdversimentController = async (req: Request, res: Response) => {
	const adversimentData = req.body;
	const userId: string = req.user.id;
	adversimentData.user = userId;
	const createAdversiment = await createAdversimentService(adversimentData);
	return res.status(201).json(createAdversiment);
};

const listAdversimentsControler = async (req: Request, res: Response) => {
	const listAdversiment = await listAdversimentService();
	return res.status(200).json(listAdversiment);
};
const listAdversimentControler = async (req: Request, res: Response) => {
	const id = req.params.id;
	const listAdversiment = await retrieveAdversimentService(id);
	return res.status(200).json(listAdversiment);
};

const deleteAdversimentController = async (req: Request, res: Response) => {
	const idAdversiment: string = req.params.id;
	await deleteAdversimentService(idAdversiment);
	return res.status(204).json();
};

const updateAdversimentController = async (req: Request, res: Response) => {
	const adversimentUpdateData: IAdversimentUpdate = req.body;
	const idAdversiment: string = req.params.id;
	const updateAdversiment = await updateAdversimentService(
		idAdversiment,
		adversimentUpdateData
	);
	return res.status(200).json(updateAdversiment);
};

export {
	createAdversimentController,
	listAdversimentControler,
	deleteAdversimentController,
	updateAdversimentController,
	listAdversimentsControler
};
