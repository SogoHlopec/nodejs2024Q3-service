import { User } from '../entities/user.entity';

export interface IUserRepository {
  getAll(): User[];
  getById(id: string): User;
  create(login: string, password: string): User;
  update(id: string, newPassword: string): User;
  delete(id: string): void;
}
