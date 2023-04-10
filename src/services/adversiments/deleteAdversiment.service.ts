import AppDataSource from "../../data-source";
import { Adversiment } from "../../entities/adversiments.entity";
import  AppError  from "../../errors/AppError";



const deleteAdversimentService = async (id:string) => {

    const AdversimentRepository = AppDataSource.getRepository(Adversiment);
    const adversiment = await AdversimentRepository.findOneBy({id:id });
    
    if(!adversiment){
        throw new AppError('Adversiment not found ', 404)
    }

    if(adversiment.isActive==false){
        throw new AppError('adversiment is already inactive ', 400)
    }

    adversiment.isActive = false

    await AdversimentRepository.save(adversiment)

    return {}

}

export default deleteAdversimentService 