import supertest from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { createServer } from "../server";
import { Server } from "http";

let app: Server;
describe('API Tests', () => {

	beforeAll(async () => {
		app = await createServer();
	})

	afterAll(async () => {
		app.close();
	})

	it('GET /endpoint should return 200', async () => {
		const response = await supertest(app).get('/status');
		expect(response.status).toBe(200);
	});

	it('GET /nonexistent should return 404', async () => {
		const response = await supertest(app).get('/nonexistent');
		expect(response.status).toBe(404);
	});
});