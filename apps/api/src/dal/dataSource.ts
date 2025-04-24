import { Service } from "typedi";
import { DataSource } from "typeorm";
import "sqlite3"

@Service()
export class DataSourceProvider {

    private dataSource?: DataSource;

    getDataSource(): DataSource {
        if (!this.dataSource) {
            throw new Error("Data source is not initialized");
        }
        return this.dataSource;
    }

    async initialize() {
        this.dataSource = new DataSource({
            type: 'sqlite',
            database: __dirname + '/../db/logEntries.sqlite',
            synchronize: true,
            logging: true,
            entities: [
                __dirname + "/../graphql/entities/*.ts",
            ],
        });

        await this.dataSource.initialize()
    }
}