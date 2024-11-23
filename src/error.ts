import { z } from "zod";

const ValidationError = z.enum(["InvalidJSON"]);
type ValidationError = z.infer<typeof ValidationError>;
export { ValidationError };
