import { Service } from "typedi";
import { DataSourceProvider } from "./dataSource";
import { LogEntry } from "../graphql/entities/logEntry";
import { LogEntryInput } from "../graphql/inputs/logEntry";
import { Repository } from "typeorm";

@Service()
export class LogEntryService {
    private _repository?: Repository<LogEntry>;

    constructor(private readonly dataSource: DataSourceProvider) { }

    private get repository(): Repository<LogEntry> {
        if (!this._repository) {
            this._repository = this.dataSource.getDataSource().getRepository(LogEntry);
        }
        return this._repository;
    }

    async getLogEntries(): Promise<LogEntry[]> {
        const entries = await this.repository.find() || [];
        return entries
    }

    async createLogEntry(logEntry: LogEntryInput): Promise<LogEntry> {
        const newLogEntry = this.repository.create(logEntry);
        newLogEntry.createdAt = new Date().toISOString();
        newLogEntry.updatedAt = new Date().toISOString();

        return this.repository.save(newLogEntry);
    }

    async updateLogEntry(id: string, logEntry: LogEntryInput): Promise<LogEntry | null> {
        const existingLogEntry = await this.repository.findOneBy({ id });
        if (!existingLogEntry) {
            return null;
        }

        const updatedLogEntry: LogEntry = {
            ...existingLogEntry,
            ...logEntry,
            updatedAt: new Date().toISOString()
        };
        await this.repository.save(updatedLogEntry);
        return updatedLogEntry as LogEntry;
    }

    async deleteLogEntry(id: string): Promise<string | undefined> {
        const result = await this.repository.delete(id);
        return result.affected !== 0 ? id : undefined;
    }
}