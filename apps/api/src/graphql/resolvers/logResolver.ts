import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { LogEntry, LogEntryDeleteResponse } from "../entities/logEntry";
import { LogEntryService } from "../../dal/logEntryService";
import { LogEntryInput } from "../inputs/logEntry";

@Service()
@Resolver(of => LogEntry)
export default class LogResolver {

    constructor(private readonly logEntryService: LogEntryService) { }

    @Query(type => [LogEntry])
    async logEntries(): Promise<Array<LogEntry>> {
        return this.logEntryService.getLogEntries();
    }

    @Mutation(type => LogEntry)
    async createLogEntry(@Arg('input') input: LogEntryInput): Promise<LogEntry> {
        return this.logEntryService.createLogEntry(input);
    }

    @Mutation(type => LogEntry, { nullable: true })
    async updateLogEntry(@Arg('id', () => ID) id: string, @Arg('input') input: LogEntryInput): Promise<LogEntry | null> {
        return this.logEntryService.updateLogEntry(id, input)
    }

    @Mutation(type => LogEntryDeleteResponse)
    async deleteLogEntry(@Arg('id', () => ID) inputId: string): Promise<LogEntryDeleteResponse> {
        const id = await this.logEntryService.deleteLogEntry(inputId);
        return { id }
    }
}