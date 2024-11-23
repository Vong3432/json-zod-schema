import { z } from "zod";
import { ValidationError } from "../error.ts";

const isJson = (jsonString: string): boolean => {
	try {
		const o = JSON.parse(jsonString);
		if (o && typeof o === "object") {
			return true;
		}
	} catch {
		if (z.literal(jsonString)) {
			return false;
		}
		throw ValidationError.Enum.InvalidJSON;
	}
	return false;
};

export { isJson };
