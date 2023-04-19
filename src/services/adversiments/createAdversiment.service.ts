import { IAdversimentRequest } from "../../interfaces/adversiments/adversiments.interface";
import AppDataSource from "../../data-source";
import { Image } from "../../entities/image.entity";
import { Advertisement } from "../../entities/advertisements.entity";
import { adversimentSerializer } from "../../serializers/adversiment.serializers";

const createAdversimentService = async (
  adversimentData: IAdversimentRequest
) => {
  const AdversimentRepository = AppDataSource.getRepository(Advertisement);
  const ImageRepository = AppDataSource.getRepository(Image);

  const images = adversimentData.images;
  delete adversimentData.images;

  const createAdversiment = AdversimentRepository.create({
    ...adversimentData,
  });
  const adversiment = await AdversimentRepository.save(createAdversiment);

  const imagensSalvas = await ImageRepository.save(
    images.map((imagem) => ({
      ...imagem,
      adversiment: adversiment,
    }))
  );

  const anuncioComImagens = {
    ...adversiment,
    images: imagensSalvas,
  };
  const response = await adversimentSerializer.validate(anuncioComImagens, {
    stripUnknown: true,
  });

  return response;
};

export default createAdversimentService;
