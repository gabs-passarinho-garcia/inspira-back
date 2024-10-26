import { UserTypeRole, UserTypeRoleEnum } from '@/shared/enum';
import z from 'zod';

export const UserOutputSchema = z
  .object({
    user: z.object({
      id: z.string().uuid().openapi({ description: 'Unique identifier for the user' }),
      name: z.string().openapi({ description: 'User name' }),
      dateOfBirth: z.coerce.date().openapi({ description: 'User date of birth' }),
      phoneNumber: z.string().openapi({ description: 'User phone number' }),
      documentNumber: z.string().openapi({ description: 'User document number' }),
      email: z.string().email().openapi({ description: 'User email' }),
      address: z.string().openapi({ description: 'User address' }),
      cityState: z.string().openapi({ description: 'City and state of the user' }),
      country: z.string().openapi({ description: 'User country' }),
      role: z.nativeEnum(UserTypeRoleEnum).openapi({ description: 'Role of the user' }),
    }),
  })
  .openapi({ title: 'UserOutput', description: 'Response schema for user information' });

export type UserOutput = z.infer<typeof UserOutputSchema>;

export const ListUserOutputSchema = z
  .object({
    users: z.array(UserOutputSchema.shape.user).openapi({
      description: 'List of users',
      title: 'ListUserOutput',
    }),
  })
  .openapi({ title: 'ListUserOutput', description: 'Response schema for listing users' });

export type ListUserOutput = z.infer<typeof ListUserOutputSchema>;

export interface GetUserInput {
  id: string;
}

export interface CreateUserInput {
  name: string;
  dateOfBirth: Date;
  phoneNumber: string;
  documentNumber: string;
  email: string;
  address: string;
  cityState: string;
  country: string;
  role: UserTypeRole;
}

export interface UpdateUserInput {
  id: string;
  name: string;
  dateOfBirth: Date;
  phoneNumber: string;
  documentNumber: string;
  email: string;
  address: string;
  cityState: string;
  country: string;
  role: string;
}
