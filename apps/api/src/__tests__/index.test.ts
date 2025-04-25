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

	it('GET /status should return 200', async () => {
		const response = await supertest(app).get('/status');
		expect(response.status).toBe(200);
	});

	it('GET /graphql should return 200 with schema data', async () => {
		const response = await supertest(app)
			.post('/graphql')
			.send({ query: '{ __schema { queryType { name } } }' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('data');
		expect(response.body.data).toHaveProperty('__schema');
	});

	it('GET /nonexistent should return 404', async () => {
		const response = await supertest(app).get('/nonexistent');
		expect(response.status).toBe(404);
	});
});