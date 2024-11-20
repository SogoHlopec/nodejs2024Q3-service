import { User } from '../entities/user.entity';
import { UpdatePasswordDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUserRepository {
  getAll(): User[];
  getById(id: string): User;
  create(createUserDto: CreateUserDto): User;
  update(id: string, updatePasswordDto: UpdatePasswordDto): User;
  delete(id: string): void;
}
