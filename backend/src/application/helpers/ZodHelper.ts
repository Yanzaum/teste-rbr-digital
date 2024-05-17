import { AnyZodObject, ZodError, z } from 'zod';
import { InvalidParamError } from '../errors/InvalidParamError';


export async function zParse<T extends AnyZodObject>(
  schema: T,
  req: any,
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(req);
  } catch (error: any | ZodError) {
    if (error instanceof ZodError) {
        throw new InvalidParamError(error.errors.map(e => e.path).join(", "));
    }

    throw new Error("Validation error");
  }
}
