import AppDataSource from "../../data-source";
import { Adversiment } from "../../entities/adversiments.entity";

const listAdversimentService = async () => {
    const AdversimentRepository = AppDataSource.getRepository(Adversiment);

    const adversimentList = AdversimentRepository.find({
        relations: {
            user: true,
            images:true,
            comments:true

        }
    })


    return adversimentList
}

export default listAdversimentService 