import { IAdversimentUpdate } from "../../interfaces/adversiments/adversiments.interface";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { Adversiment } from "../../entities/adversiments.entity";


const updateAdversimentService = async (idAdversiment:string, adversimentUpdateData:IAdversimentUpdate) => {

    const AdversimentRepository = AppDataSource.getRepository(Adversiment);

    
    const adversiment = await AdversimentRepository.findOneBy({ id:idAdversiment });



    if(!adversiment){
        throw new AppError('adversiment not found ', 404)
    }


    const updatedAdversiment = AdversimentRepository.create({
        ...adversiment,
        ...adversimentUpdateData
    })

    
    await AdversimentRepository.save(updatedAdversiment)


    return updatedAdversiment
    
}

export default updateAdversimentService 