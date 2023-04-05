import "reflect-metadata"
import "dotenv/config"
import {DataSource, DataSourceOptions} from "typeorm"

const setDataSourceConfig = (): DataSourceOptions => {
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [],
            migrations: []
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
        entities: [],
        migrations: [],
    }
}

const AppDataSource = new DataSource(setDataSourceConfig());
export default AppDataSource;