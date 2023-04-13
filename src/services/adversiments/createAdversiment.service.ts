import { IAdversimentRequest } from "../../interfaces/adversiments/adversiments.interface";
import AppDataSource from "../../data-source";
import { Image } from "../../entities/image.entity";
import { Adversiment } from "../../entities/adversiments.entity";




const createAdversimentService = async (adversimentData: IAdversimentRequest,) => {
    const AdversimentRepository = AppDataSource.getRepository(Adversiment);
    const ImageRepository = AppDataSource.getRepository(Image);

    const images = adversimentData.images
    delete adversimentData.images

    const createAdversiment = AdversimentRepository.create({...adversimentData});
    const adversiment = await AdversimentRepository.save(createAdversiment);

    const imagensSalvas = await ImageRepository.save(images.map(imagem => ({
        ...imagem,
        adversiment: adversiment,
      })));

    const anuncioComImagens = {
        ...adversiment,
        imagens: imagensSalvas,
      };
    return anuncioComImagens;
};

export default createAdversimentService 