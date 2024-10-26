
import { UserTypeRole } from '@/shared/enum';

export interface UserOutput {
    user: {
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
    };
}

export interface ListUserOutput {
    users: UserOutput['user'][];
}

export interface GetUnserInput {
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
