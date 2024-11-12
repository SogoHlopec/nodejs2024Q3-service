import { User } from '../entities/user.entity';

export interface IUserRepository {
  getAll(): User[];
  getById(id: string): User | undefined;
  create(login: string, password: string): User;
  update(id: string, newPassword: string): User | null;
  delete(id: string): boolean;
}
