import { ContentCategoryEnum, FundingTypeEnum, UserTypeRoleEnum } from '@/shared/enum';
import z from 'zod';

const CreateUserInputSchema = z
  .object({
    name: z.string().openapi({
      title: 'Name',
      description: 'Nome do usuário',
      example: 'João da Silva',
      type: 'string',
    }),
    dateOfBirth: z.coerce.date().openapi({
      title: 'DateOfBirth',
      description: 'Data de nascimento do usuário',
      example: '1990-01-01T00:00:00.000Z',
      type: 'string',
    }),
    phoneNumber: z.string().openapi({
      title: 'PhoneNumber',
      description: 'Número de telefone do usuário',
      example: '+55 11 99999-9999',
      type: 'string',
    }),
    documentNumber: z.string().openapi({
      title: 'DocumentNumber',
      description: 'Número do documento do usuário',
      example: '123.456.789-00',
      type: 'string',
    }),
    email: z.string().email().openapi({
      title: 'Email',
      description: 'Endereço de e-mail do usuário',
      example: 'example@example.com.br',
      type: 'string',
    }),
    address: z.string().openapi({
      title: 'Address',
      description: 'Endereço do usuário',
      example: 'Rua dos Bobos, 0',
      type: 'string',
    }),
    cityState: z.string().openapi({
      title: 'CityState',
      description: 'Cidade e Estado do usuário',
      example: 'São Paulo - SP',
      type: 'string',
    }),
    country: z.string().openapi({
      title: 'Country',
      description: 'País do usuário',
      example: 'Brasil',
      type: 'string',
    }),
    role: z.nativeEnum(UserTypeRoleEnum).openapi({
      title: 'Role',
      description: 'Função do usuário',
      example: 'CREATOR',
      type: 'string',
    }),
  })
  .openapi({
    title: 'CreateUserInput',
    description: 'Schema de entrada para criação de um usuário',
    required: [
      'name',
      'dateOfBirth',
      'phoneNumber',
      'documentNumber',
      'email',
      'address',
      'cityState',
      'country',
      'role',
    ],
  });

// Schema de Content Input, sem o campo authorId
const CreateContentInputSchema = z
  .object({
    title: z.string().openapi({
      title: 'Title',
      description: 'Título do conteúdo',
      example: 'Narnia',
      type: 'string',
    }),
    place: z.string().openapi({
      title: 'Place',
      description: 'Local do conteúdo',
      example: 'Nárnia',
      type: 'string',
    }),
    description: z.string().openapi({
      title: 'Description',
      description: 'Descrição do conteúdo',
      example: 'Uma descrição sobre Nárnia',
      type: 'string',
    }),
    category: z.nativeEnum(ContentCategoryEnum).openapi({
      title: 'Category',
      description: 'Categoria do conteúdo',
      example: 'LITERATURE',
      type: 'string',
    }),
  })
  .openapi({
    title: 'CreateContentInput',
    description: 'Schema de entrada para criação de um conteúdo',
    required: ['title', 'place', 'description', 'category'],
  });

export const CreateFundingInputSchema = z
  .object({
    title: z.string().openapi({
      description: 'Title of the funding',
      example: 'Community Art Project',
      type: 'string',
    }),
    description: z.string().openapi({
      description: 'Description of the funding',
      example: 'A project to support local artists',
      type: 'string',
    }),
    goal: z.number().positive().openapi({
      description: 'Funding goal amount',
      example: 5000,
      type: 'number',
      minimum: 0,
    }),
    deadline: z.string().datetime().openapi({
      description: 'Deadline for the funding',
      example: '2024-12-31T00:00:00.000Z',
      type: 'string',
      format: 'date',
    }),
    type: z.nativeEnum(FundingTypeEnum).openapi({
      description: 'Funding model type',
      example: FundingTypeEnum.ALL_OR_NOTHING,
      type: 'string',
      enum: Object.values(FundingTypeEnum),
    }),
  })
  .openapi({
    title: 'CreateFundingInput',
    description: 'Input schema for creating a funding entry',
    required: ['title', 'description', 'goal', 'deadline', 'status', 'type'],
  });

// Unificação dos Schemas de User e Content
export const SignupInputSchema = z
  .object({
    user: CreateUserInputSchema,
    content: CreateContentInputSchema,
    funding: CreateFundingInputSchema,
  })
  .openapi({
    title: 'SignupInput',
    description: 'Schema de entrada para cadastro de usuário e conteúdo',
    required: ['user', 'content', 'funding'],
  });

export type SignupInput = z.infer<typeof SignupInputSchema>;
