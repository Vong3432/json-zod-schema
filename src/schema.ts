import type { z } from "zod";
import { isJson } from "./validator/isJSON.ts";

export const Schema = {
	/**
	 *
	 * @throws {ValidationError}
	 */
	get<T>(zodType: z.ZodType<T>, jsonString: string): T | null {
		if (isJson(jsonString)) {
			const obj = JSON.parse(jsonString);
			return zodType.safeParse(obj).data ?? null;
		}
		return zodType.safeParse(jsonString).data ?? null;
	},
};
