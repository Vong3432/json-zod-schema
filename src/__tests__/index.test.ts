import { deepStrictEqual } from "node:assert/strict";
import { equal, fail } from "node:assert/strict";
import { describe, it } from "node:test";
import { z } from "zod";
import { ValidationError } from "../error.ts";
import { Schema } from "../schema.ts";

await describe("Schema", async () => {
	await describe("given literal type", async () => {
		const data = "string";

		await describe("when decoded with number", async () => {
			await it("should return null", () => {
				const numSchema = z.number();
				const result = Schema.get(numSchema, data);
				deepStrictEqual(result, null);
			});
		});

		await describe("when decoded with string", async () => {
			await it("should return string", () => {
				const strSchema = z.string();
				const result = Schema.get(strSchema, data);
				deepStrictEqual(result, data);
			});
		});
	});

	await describe("given obj", async () => {
		const mockUser = {
			firstName: "John",
			lastName: "Doe",
		};

		const jsonString = JSON.stringify(mockUser);
		await describe("when decoded with custom schema", async () => {
			await it("should return parsed result", () => {
				const customSchema = z.object({
					firstName: z.string().nullable(),
					lastName: z.string().nullable(),
				});
				const result = Schema.get(customSchema, jsonString);
				deepStrictEqual(result, mockUser);
			});
		});
	});

	await describe("given obj", async () => {
		const mockUser = {
			firstName: "John",
		};

		const jsonString = JSON.stringify(mockUser);
		await describe("when decoded with custom schema and missing fields", async () => {
			await it("should return parsed result", () => {
				const customSchema = z.object({
					firstName: z.string().nullable(),
					lastName: z.string().nullable(),
				});
				try {
					const _result = Schema.get(customSchema, jsonString);
					fail("This should not run");
				} catch (e) {
					equal(e as ValidationError, ValidationError.Enum.InvalidSchema);
				}
			});
		});
	});

	await describe("given array of objects (valid)", async () => {
		const arr = [
			{
				teacher: {
					id: "t1",
					name: "Mr. Smith",
					subject: "Mathematics",
					students: [
						{
							id: "s1",
							name: "Alice",
							grade: 95,
						},
						{
							id: "s2",
							name: "Bob",
							grade: 88,
						},
					],
				},
			},
			{
				teacher: {
					id: "t1",
					name: "Mr. Smith",
					subject: "Physics",
					students: [
						{
							id: "s2",
							name: "Bob",
							grade: 92,
						},
						{
							id: "s3",
							name: "Charlie",
							grade: 85,
						},
					],
				},
			},
		];

		const jsonString = JSON.stringify(arr);
		await describe("when decoded with custom schema", async () => {
			await it("should return parsed result", () => {
				const customSchema = z.array(
					z.object({
						teacher: z.object({
							id: z.string(),
							name: z.string(),
							subject: z.string(),
							students: z.array(
								z.object({
									id: z.string(),
									name: z.string(),
									grade: z.number(),
								}),
							),
						}),
					}),
				);
				const result = Schema.get(customSchema, jsonString);
				deepStrictEqual(result, arr);
			});
		});
	});

	await describe("given array of objects (valid)", async () => {
		const arr = [
			{
				teacher: {
					id: "t1",
					name: "Mr. Smith",
					subject: "Mathematics",
					students: [
						{
							id: "s1",
							name: "Alice",
							grade: 95,
						},
						{
							id: "s2",
							name: "Bob",
							grade: 88,
						},
					],
				},
			},
			{
				teacher: {
					id: "t1",
					name: "Mr. Smith",
					subject: "Physics",
					students: [
						{
							id: "s2",
							name: "Bob",
							grade: 92,
						},
						{
							id: "s3",
							name: "Charlie",
							grade: 85,
						},
					],
				},
			},
		];

		const jsonString = JSON.stringify(arr);
		await describe("when decoded with diff schema", async () => {
			await it("should not return parsed result, and throws ValidationError.InvalidSchema", () => {
				const customSchema = z.array(
					z.object({
						hello: z.object({
							id: z.string(),
						}),
					}),
				);
				try {
					const _result = Schema.get(customSchema, jsonString);
					fail("This should not run");
				} catch (e) {
					equal(e as ValidationError, ValidationError.Enum.InvalidSchema);
				}
			});
		});
	});

	await describe("given array of objects (invalid)", async () => {
		const jsonString = `
		[
			{
				"teacher": {
				"id": "t1",
				"name": "Mr. Smith",
				"subject": "Mathematics",
				"students": [
					{
					"id": "s1",
					"name": "Alice",
					"grade": 95
					},
					{
					"id": "s2",
					"name": "Bob",
					"grade": 88
					}
				]
				}
			},
			{
				"teacher": {
				"id": "t1",
				"name": "Mr. Smith",
				"subject": "Physics"
				"students": [
					{
					"id": "s2",
					"name": "Bob",
					"grade": 92
					},
					{
					"id": "s3",
					"name": "Charlie",
					"grade": 85
					}
				]
				}
			}
			]
		`;

		await describe("when decoded with custom schema", async () => {
			await it("should return null", () => {
				const customSchema = z.array(
					z.object({
						teacher: z.object({
							id: z.string(),
							name: z.string(),
							subject: z.string(),
							students: z.array(
								z.object({
									id: z.string(),
									name: z.string(),
									grade: z.number(),
								}),
							),
						}),
					}),
				);
				const result = Schema.get(customSchema, jsonString);
				deepStrictEqual(result, null);
			});
		});
	});
});
