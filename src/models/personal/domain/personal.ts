export interface Personal {
    id?: number; // Adicionamos um ID opcional para identificar o registro
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