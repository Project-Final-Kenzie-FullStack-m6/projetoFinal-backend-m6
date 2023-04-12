import { IAdversimentRequest } from "../../interfaces/adversiments/adversiments.interface";
import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { Image } from "../../entities/image.entity";
import { Adversiment } from "../../entities/adversiments.entity";




const createAdversimentService = async (adversimentData: IAdversimentRequest) => {
    const AdversimentRepository = AppDataSource.getRepository(Adversiment);
    const ImageRepository = AppDataSource.getRepository(Image);


    const image = await ImageRepository.findOneBy({imageUrl:adversimentData.image.imageUrl})
    const adversiment = await AdversimentRepository.findOneBy({ ...adversimentData});

    if(image){
        throw new AppError('This image already exists', 409);
    }

    if (adversiment) {
        throw new AppError('This adversiment already exists', 409);
    }

    const createImage = ImageRepository.create(adversimentData.image)
    await ImageRepository.save(createImage)


    const createAdversiment = AdversimentRepository.create({...adversimentData});
    await AdversimentRepository.save(createAdversiment);
    
    return createAdversiment;
};

export default createAdversimentService 