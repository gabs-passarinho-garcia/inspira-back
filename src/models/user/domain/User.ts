import type { UserTypeRole } from '@/shared/enum';

type UserProps = {
    id: string; // Adicionamos um ID opcional para identificar o registro
    name: string;
    dateOfBirth: Date;
    phoneNumber: string;
    documentNumber: string;
    email: string;
    address: string;
    cityState: string;
    country: string;
    createdAt:      Date;
    updatedAt:      Date | null;
    createdBy:      string;
    updatedBy:      string | null;
    role: UserTypeRole;
};

export class User {
    private readonly _id: string;
    private _name: string;
    private _dateOfBirth: Date;
    private _phoneNumber: string;
    private _documentNumber: string;
    private _email: string;
    private _address: string;
    private _cityState: string;
    private _country: string;
    private _role: UserTypeRole;
    private _createdAt: Date;
    private _updatedAt: Date | null;
    private _createdBy: string;
    private _updatedBy: string | null;

  private constructor(props: UserProps) {
    this._id = props.id;
    this._name = props.name;
    this._dateOfBirth = props.dateOfBirth;
    this._phoneNumber = props.phoneNumber;
    this._documentNumber = props.documentNumber;
    this._email = props.email;
    this._address = props.address;
    this._cityState = props.cityState;
    this._country = props.country;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._createdBy = props.createdBy;
    this._updatedBy = props.updatedBy;
    this._role = props.role; 
  }

 // Getters

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }
  get phoneNumber(): string {
    return this._phoneNumber;
  }
  get documentNumber(): string {
    return this._documentNumber;
  }
  get email(): string {
    return this._email;
  }
  get address(): string {
    return this._address;
  }
  get cityState(): string {
    return this._cityState;
  }
  get country(): string {
    return this._country;
  }
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date | null {
    return this._updatedAt;
  }
  get createdBy(): string {
    return this._createdBy;
  }
  get updatedBy(): string | null {
    return this._updatedBy;
  }
  get role(): UserTypeRole {
    return this._role;
  }


 // Setters
  set name(value: string) {
    this._name = value;
  }
  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }
  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }
  set documentNumber(value: string) {
    this._documentNumber = value;
  }
  set email(value: string) {
    this._email = value;
  }
  set address(value: string) {
    this._address = value;
  }
  set cityState(value: string) {
    this._cityState = value;
  }
  set country(value: string) {
    this._country = value;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }
  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
  set createdBy(value: string) {
    this._createdBy = value;
  }
  set updatedBy(value: string) {
    this._updatedBy = value;
  }
  set role(value: UserTypeRole) {
    this._role = value;
  }

  // Static factory
  public static create(props: UserProps): User {
    return new User(props);
  }
}
