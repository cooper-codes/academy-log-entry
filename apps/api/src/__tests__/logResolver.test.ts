import { it, describe, beforeEach, expect, jest } from "@jest/globals";

import LogResolver from "../graphql/resolvers/logResolver";
import { LogEntryService } from "../dal/logEntryService";
import { LogEntry } from "../graphql/entities/logEntry";
import { LogEntryInput } from "../graphql/inputs/logEntry";
import { DataSourceProvider } from "../dal/dataSource";

jest.mock("../dal/logEntryService");
jest.mock("../dal/dataSource");

describe("LogResolver", () => {
    let logResolver: LogResolver;
    let logEntryServiceMock: jest.Mocked<LogEntryService>;

    beforeEach(() => {
        const dataSourceProviderMock = new DataSourceProvider() as jest.Mocked<DataSourceProvider>;
        logEntryServiceMock = new LogEntryService(dataSourceProviderMock) as jest.Mocked<LogEntryService>;
        logResolver = new LogResolver(logEntryServiceMock);
    });

    it("should fetch all log entries", async () => {
        const mockLogEntries: LogEntry[] = [
            { id: "1", name: "Test name 1", location: "location 1", description: "description 1", date: "2024-04-24", createdAt: "2024-04-22T10:00:00.000Z", updatedAt: "2024-04-22T10:00:00.000Z" },
            { id: "2", name: "Test name 2", location: "location 2", description: "description 2", date: "2024-04-23", createdAt: "2024-04-23T10:00:00.000Z", updatedAt: "2024-04-23T10:00:00.000Z" },
        ];
        logEntryServiceMock.getLogEntries.mockResolvedValue(mockLogEntries);

        const result = await logResolver.logEntries();

        expect(logEntryServiceMock.getLogEntries).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLogEntries);
    });

    it("should create a new log entry", async () => {
        const input: LogEntryInput = { name: "Test name 1", location: "location 1", description: "description 1", date: "2024-04-24" };
        const mockLogEntry: LogEntry = { id: "1", createdAt: "2024-04-22T10:00:00.000Z", updatedAt: "2024-04-22T10:00:00.000Z", ...input };

        logEntryServiceMock.createLogEntry.mockResolvedValue(mockLogEntry);

        const result = await logResolver.createLogEntry(input);

        expect(logEntryServiceMock.createLogEntry).toHaveBeenCalledWith(input);
        expect(result).toEqual(mockLogEntry);
    });

    it("should update an existing log entry", async () => {
        const id = "1";
        const input: LogEntryInput = { name: "Updated name", location: "Updated location", description: "description 1", date: "2024-04-24" };
        const mockUpdatedLogEntry: LogEntry = { id, ...input, createdAt: Date.now().toString(), updatedAt: Date.now().toString() };
        logEntryServiceMock.updateLogEntry.mockResolvedValue(mockUpdatedLogEntry);

        const result = await logResolver.updateLogEntry(id, input);

        expect(logEntryServiceMock.updateLogEntry).toHaveBeenCalledWith(id, input);
        expect(result).toEqual(mockUpdatedLogEntry);
    });

    it("should delete a log entry", async () => {
        const id = "1";
        logEntryServiceMock.deleteLogEntry.mockResolvedValue(id);

        const result = await logResolver.deleteLogEntry(id);

        expect(logEntryServiceMock.deleteLogEntry).toHaveBeenCalledWith(id);
        expect(result).toEqual({ id });
    });
});