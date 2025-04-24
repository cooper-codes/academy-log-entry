import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import { type Express } from "express";

describe('API Tests', () => {
	it('GET /endpoint should return 200', async () => {
		const response = await request(app).get('/endpoint');
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('data');
	});

	it('POST /endpoint should return 201', async () => {
		const response = await request(app).post('/endpoint').send({ key: 'value' });
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('message', 'Created');
	});

	it('GET /nonexistent should return 404', async () => {
		const response = await request(app).get('/nonexistent');
		expect(response.status).toBe(404);
	});
});