import { jest, describe, beforeEach, expect, it } from "@jest/globals";
import { Repository } from "typeorm";
import { LogEntryService } from "../dal/logEntryService";
import { DataSourceProvider } from "../dal/dataSource";
import { LogEntry } from "../graphql/entities/logEntry";
import { LogEntryInput } from "../graphql/inputs/logEntry";

jest.mock("../dal/dataSource");

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe("LogEntryService", () => {
    let logEntryService: LogEntryService;
    let repositoryMock: jest.Mocked<Repository<LogEntry>>;
    let dataSourceProviderMock: jest.Mocked<DataSourceProvider>;

    beforeEach(() => {
        repositoryMock = {
            find: jest.fn(),
            create: jest.fn((input: LogEntryInput) => ({
                ...input,
                id: new Date().getTime() % 1000,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            } as unknown) as LogEntry),
            save: jest.fn((input: LogEntryInput) => (input as unknown) as LogEntry),
            findOneBy: jest.fn(),
            delete: jest.fn(),
        } as unknown as jest.Mocked<Repository<LogEntry>>;

        dataSourceProviderMock = {
            getDataSource: jest.fn().mockReturnValue({
                getRepository: jest.fn().mockReturnValue(repositoryMock),
            }),
        } as unknown as jest.Mocked<DataSourceProvider>;

        logEntryService = new LogEntryService(dataSourceProviderMock);
    });

    it("should fetch all log entries", async () => {
        const mockLogEntries: LogEntry[] = [
            { id: "1", name: "Name 1", description: "Description 1", location: "Location 1", date: "2024-05-01", createdAt: "", updatedAt: "" },
            { id: "2", name: "Name 2", description: "Description 2", location: "Location 2", date: "2024-05-03", createdAt: "", updatedAt: "" },
        ];
        repositoryMock.find.mockResolvedValue(mockLogEntries);

        const result = await logEntryService.getLogEntries();

        expect(repositoryMock.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLogEntries);
    });

    it("should create a new log entry", async () => {
        const input: LogEntryInput = { name: "New Name", description: "New Content", location: "New Location", date: "2024-05-01" };

        const result = await logEntryService.createLogEntry(input);

        expect(repositoryMock.create).toHaveBeenCalledWith(input);

        await timeout(100); // Simulate async behavior

        const now = new Date();
        expect(new Date(result.createdAt).getTime()).toBeLessThan(now.getTime());
        expect(new Date(result.updatedAt).getTime()).toBeLessThan(now.getTime());
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.description).toEqual(input.description);
        expect(result.location).toEqual(input.location);
        expect(result.date).toEqual(input.date);
        expect(repositoryMock.save).toHaveBeenCalledWith(result);
    });

    it("should update an existing log entry", async () => {
        const id = "1";

        const date = new Date()
        date.setDate(date.getDate() - 1); // Set date to yesterday
        const input: LogEntryInput = { name: "Updated Name", description: "Updated Content", location: "Updated Location", date: "2024-05-01" };
        const existingLogEntry: LogEntry = { id, name: "Name 1", description: "Description 1", location: "Location 1", date: "2024-05-01", createdAt: date, updatedAt: date };

        repositoryMock.findOneBy.mockResolvedValue(existingLogEntry);

        const result = await logEntryService.updateLogEntry(id, input);

        const now = new Date();
        // Updated date should have been updated to a more recent time
        expect(new Date(result!.updatedAt).getTime()).toBeGreaterThan(new Date(existingLogEntry.updatedAt).getTime());
        // Created date should remain the same
        expect(new Date(result!.createdAt).getTime()).toEqual(new Date(existingLogEntry.createdAt).getTime());
        // Everything else should be the same
        expect(result!.id).toEqual(id);
        expect(result!.name).toEqual(input.name);
        expect(result!.description).toEqual(input.description);
        expect(result!.location).toEqual(input.location);
        expect(result!.date).toEqual(input.date);

        expect(repositoryMock.save).toHaveBeenCalledWith(result);
        expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id });

    });

    it("should return null when updating a non-existent log entry", async () => {
        const id = "1";
        const input: LogEntryInput = { name: "Updated Entry", description: "Updated Content", location: "Updated Location", date: "2024-05-01" };

        repositoryMock.findOneBy.mockResolvedValue(null);

        const result = await logEntryService.updateLogEntry(id, input);

        expect(repositoryMock.findOneBy).toHaveBeenCalledWith({ id });
        expect(result).toBeNull();
    });

    it("should delete a log entry", async () => {
        const id = "1";
        repositoryMock.delete.mockResolvedValue({ affected: 1 } as any);

        const result = await logEntryService.deleteLogEntry(id);

        expect(repositoryMock.delete).toHaveBeenCalledWith(id);
        expect(result).toEqual(id);
    });

    it("should return undefined when deleting a non-existent log entry", async () => {
        const id = "1";
        repositoryMock.delete.mockResolvedValue({ affected: 0 } as any);

        const result = await logEntryService.deleteLogEntry(id);

        expect(repositoryMock.delete).toHaveBeenCalledWith(id);
        expect(result).toBeUndefined();
    });
});