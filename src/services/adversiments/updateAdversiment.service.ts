import { IAdversimentUpdate } from "../../interfaces/adversiments/adversiments.interface";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { Adversiment } from "../../entities/adversiments.entity";
import { Image } from "../../entities/image.entity";


const updateAdversimentService = async (idAdversiment:string, adversimentUpdateData:IAdversimentUpdate) => {

    const AdversimentRepository = AppDataSource.getRepository(Adversiment);
    const imageRepository = AppDataSource.getRepository(Image)
    
    if (adversimentUpdateData.images == undefined){
        adversimentUpdateData.images = ["!"]
        adversimentUpdateData.images.pop()
    }
    let images= adversimentUpdateData.images
    delete adversimentUpdateData.images




    const adversiment = await AppDataSource
    .createQueryBuilder()
    .from(Adversiment, "adversiments")
    .select("adversiments")
    .where("adversiments.id = :id", { id: idAdversiment })
    .leftJoinAndSelect("adversiments.images", "images")
    .getOne()

    if(!adversiment){
        throw new AppError('adversiment not found ', 404)
    }
 
    const imagensAntigas = adversiment.images

    const updateAdversiment = AdversimentRepository.create({
        ...adversiment,
        ...adversimentUpdateData,
      });
    await AdversimentRepository.save(updateAdversiment)
    console.log(updateAdversiment)

    if(images.length>0){
        const imagensAtualizadas = await imageRepository.save(images.map(image => ({
            ...image,
            adversiment: updateAdversiment,
        })));
        const imagensRemovidas = await imageRepository.remove(imagensAntigas);
        
    }
    

    return await AppDataSource
    .createQueryBuilder()
    .from(Adversiment, "adversiments")
    .select("adversiments")
    .where("adversiments.id = :id", { id: idAdversiment })
    .leftJoinAndSelect("adversiments.images", "images")
    .getOne()
    
}

export default updateAdversimentService 
