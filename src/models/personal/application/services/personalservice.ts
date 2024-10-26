

import { Personal } from '@/domain/personal/';



import { PersonalRepository } from '../repositories/personalRepository';

export class PersonalService {
    private repository: PersonalRepository;

    constructor() {
        this.repository = new PersonalRepository();
    }

    public async create(personal: Personal): Promise<Personal> {
        return this.repository.create(personal);
    }

    public async findAll(): Promise<Personal[]> {
        return this.repository.findAll();
    }

    public async findById(id: number): Promise<Personal | undefined> {
        return this.repository.findById(id);
    }

    public async update(id: number, updatedPersonal: Personal): Promise<Personal | undefined> {
        return this.repository.update(id, updatedPersonal);
    }

    public async delete(id: number): Promise<boolean> {
        return this.repository.delete(id);
    }
}
