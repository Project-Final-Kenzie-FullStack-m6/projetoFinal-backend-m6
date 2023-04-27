import "reflect-metadata";
import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entities/user.entity";
import { Advertisement } from "./entities/advertisements.entity";
import { Comment } from "./entities/comments.entity";
import { Address } from "./entities/address.entity";
import { Image } from "./entities/image.entity";
import { initialMigration1681996694919 } from "./migrations/1681996694919-initialMigration";
import { newTypecpf1681997245574 } from "./migrations/1681997245574-newTypecpf";

const setDataSourceConfig = (): DataSourceOptions => {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "production") {
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [User, Advertisement, Address, Image, Comment],
      migrations: [initialMigration1681996694919,newTypecpf1681997245574],
    };
  }
  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      entities: [User, Advertisement, Comment, Address, Image],
      synchronize: true,
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
    entities: [User, Advertisement, Address, Image, Comment],
    migrations: [initialMigration1681996694919,newTypecpf1681997245574],
  };
};

const AppDataSource = new DataSource(setDataSourceConfig());
export default AppDataSource;
