import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { Adversiment } from "./entities/adversiments.entity";
import { Comment } from "./entities/comments.entity";
import { Address } from "./entities/address.entity";
import { Image } from "./entities/image.entity";
import { initial1680801480184 } from "./migrations/1680801480184-initial";
import {initialmigration1681308962242} from "./migrations/1681308962242-initialmigration"

const setDataSourceConfig = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [User, Adversiment, Comment, Address, Image],
      migrations: [initial1680801480184, initialmigration1681308962242],
    };
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
    entities: [User, Adversiment, Comment, Address, Image],
    migrations: [initial1680801480184, initialmigration1681308962242],
  };
};

const AppDataSource = new DataSource(setDataSourceConfig());
export default AppDataSource;
