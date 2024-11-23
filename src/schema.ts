import type { z } from "zod";
import { ValidationError } from "./error.ts";
import { isJson } from "./validator/isJSON.ts";

export const Schema = {
	/**
	 *
	 * @throws {ValidationError}
	 */
	get<T>(zodType: z.ZodType<T>, jsonString: string): T | null {
		if (isJson(jsonString)) {
			const obj = JSON.parse(jsonString);
			const parsed = zodType.safeParse(obj).data;
			if (parsed) {
				return parsed;
			}
			throw ValidationError.Enum.InvalidSchema;
		}
		return zodType.safeParse(jsonString).data ?? null;
	},
};
