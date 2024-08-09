import { z, ZodType } from 'zod';

export class AuthValidation {
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z
      .string()
      .max(255)
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/\d/, { message: 'Password must contain at least one digit' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character',
      }),
  });

  static readonly REGISTER: ZodType = z.object({
    name: z.string().max(255),
    email: z.string().email(),
    password: z
      .string()
      .max(255)
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/\d/, { message: 'Password must contain at least one digit' })
      .regex(/[\W_]/, {
        message: 'Password must contain at least one special character',
      }),
  });
}
