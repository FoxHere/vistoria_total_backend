import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config'; 

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    migrations: [__dirname + '/migrations/*.{js,ts}']
};

const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize()
    .then(() => console.log("Data source has been initialized!"))
    .catch((err) => console.error("Error during data source initialization", err))

export default dataSource;