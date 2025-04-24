import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { LogEntry, LogEntryDeleteResponse } from "../entities/logEntry";
import { LogEntryService } from "../../dal/logEntryService";
import { CreateLogEntryInput, UpdateLogEntryInput } from "../inputs/logEntry";

@Service()
@Resolver(of => LogEntry)
export default class LogResolver {

    constructor(private readonly logEntryService: LogEntryService) { }

    @Query(type => [LogEntry])
    async logEntries(): Promise<Array<LogEntry>> {
        return this.logEntryService.getLogEntries();
    }

    @Mutation(type => LogEntry)
    async createLogEntry(@Arg('input') input: CreateLogEntryInput): Promise<LogEntry> {
        return this.logEntryService.createLogEntry(input);
    }

    @Mutation(type => LogEntry, { nullable: true })
    async updateLogEntry(@Arg('input') input: UpdateLogEntryInput): Promise<LogEntry | null> {
        return this.logEntryService.updateLogEntry(input)
    }

    @Mutation(type => LogEntryDeleteResponse)
    async deleteLogEntry(@Arg('id', () => ID) inputId: string): Promise<LogEntryDeleteResponse> {
        const id = await this.logEntryService.deleteLogEntry(inputId);
        return { id }
    }
}