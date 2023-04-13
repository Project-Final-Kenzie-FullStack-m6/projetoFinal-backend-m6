import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { Adversiment } from "./entities/adversiments.entity";
// import { Comment } from "./entities/comments.entity";
import { Address } from "./entities/address.entity";
import { Image } from "./entities/image.entity";
import { initialMigration1681393028173 } from "./migrations/1681393028173-initialMigration";


const setDataSourceConfig = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [User, Adversiment,Address, Image],
      migrations: [initialMigration1681393028173],
    };
  }
  if(nodeEnv ==="test"){
   return{
     type: "sqlite",
          database: ":memory:",
          entities: [User, Adversiment, Comment, Address, Image],
          synchronize: true,
        }
       
  } 
  

  return {
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT),
    database: process.env.DB,
    synchronize: false,
    logging: true,
    entities: [User, Adversiment, Address, Image],
    migrations: [initialMigration1681393028173],
  };
};

const AppDataSource = new DataSource(setDataSourceConfig());
export default AppDataSource;
