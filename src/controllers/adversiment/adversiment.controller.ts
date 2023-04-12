import { Request,Response } from "express";
import { IAdversimentRequest, IAdversimentUpdate } from "../../interfaces/adversiments/adversiments.interface";


//**impor dos services */
import createAdversimentService from "../../services/adversiments/createAdversiment.service";
import listAdversimentService from "../../services/adversiments/listAdversiment.service";
import deleteAdversimentService from "../../services/adversiments/deleteAdversiment.service";
import uptadeAdversimentService from "../../services/adversiments/updateAdversiment.service";



const createAdversimentController = async (req: Request, res: Response) => {
    const adversimentData: IAdversimentRequest = req.body
    const createAdversiment = await createAdversimentService(adversimentData)
    return res.status(201).json(createAdversiment)
}

const listAdversimentControler = async (req:Request, res:Response ) => {
    const listAdversiment = await listAdversimentService()
    return res.status(200).json(listAdversiment)
}

const deleteAdversimentController = async (req: Request, res: Response) => {
    const idAdversiment : string = req.params.id
    const deleteAdversiment = await deleteAdversimentService(idAdversiment)
    return res.status(204).json(deleteAdversiment)
}

const uptadeAdversimentController = async (req: Request, res: Response) => { 
    const adversimentUpdateData: IAdversimentUpdate = req.body
    const idAdversiment : string = req.params.id
    const updateAdversiment = await uptadeAdversimentService(idAdversiment, adversimentUpdateData) 
    return res.status(200).json(updateAdversiment)
}

export {createAdversimentController, listAdversimentControler, deleteAdversimentController, uptadeAdversimentController}