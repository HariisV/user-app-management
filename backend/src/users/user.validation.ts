import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly CHANGE_PASSWORD: ZodType = z.object({
    oldPassword: z
      .string()
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
      })
      .max(255),
    password: z
      .string()
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
      })
      .max(255),
  });

  static readonly CHANGE_PROFILE: ZodType = z.object({
    name: z.string().max(255),
  });
}
