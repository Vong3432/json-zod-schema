import { z } from "zod";

const ValidationError = z.enum(["InvalidSchema"]);
type ValidationError = z.infer<typeof ValidationError>;
export { ValidationError };
