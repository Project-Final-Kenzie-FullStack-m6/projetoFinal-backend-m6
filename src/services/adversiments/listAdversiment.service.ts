import AppDataSource from "../../data-source";
import { Advertisement } from "../../entities/advertisements.entity";
import AppError from "../../errors/AppError";
import { adversimentsResponseSerializer } from "../../serializers/adversiment.serializers";

const listAdversimentService = async (
	limit: number,
	page: number
	) => {
		const count =await AppDataSource
	  .createQueryBuilder(Advertisement, "advertisements")
	  .select("COUNT(advertisements.id)")
	  .withDeleted()
	  .getCount();
	  
	  if (!count) {
		  throw new AppError("empty list", 404);
		}
		
		const totalPages: number = Math.ceil(count / limit);
		
		const isNotPage = page >= 1 ? page : 1;
		
		const validatedPage = isNotPage > totalPages ? totalPages : isNotPage;
		
		const skip: number = Math.abs(validatedPage * limit - limit);
		
		let nextPage: string =
		totalPages <= validatedPage
		? null
		: `http://localhost:3001/adversiments?page=${
			validatedPage + 1
		}`;
		
		let previousPage: string =
		skip * limit <= 1
		? null
		: `http://localhost:3001/adversiments?page=${
			validatedPage - 1
		}`;
		
	const advertisements = await AppDataSource
	.createQueryBuilder()
	.from(Advertisement, "advertisements")
	.select("advertisements")
	.leftJoinAndSelect("advertisements.images", "images")
	.leftJoinAndSelect("advertisements.user", "user")
	.orderBy("advertisements.createdAt", "DESC")
	.take(limit)
	.skip(skip)
	  .withDeleted()
	  .getMany();
  
	  const validatedData = await adversimentsResponseSerializer.validate(
		advertisements,
		  {
			  abortEarly: false,
			  stripUnknown: true,
			}
			);
  
			const advertisementsResponse = {
				nextPage: nextPage,
				previousPage: previousPage,
				totalPages: totalPages,
				advertisements: validatedData,
			};
			
			return advertisementsResponse;
		};

		export default listAdversimentService;