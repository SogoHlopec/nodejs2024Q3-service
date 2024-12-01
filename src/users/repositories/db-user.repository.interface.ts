import { DbUser } from '../entities/user.entity';
import { UpdatePasswordDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IDbUserRepository {
  getAll(): Promise<DbUser[]>;
  getById(id: string): Promise<DbUser>;
  create(createUserDto: CreateUserDto): Promise<DbUser>;
  update(id: string, updatePasswordDto: UpdatePasswordDto): Promise<DbUser>;
  delete(id: string): Promise<void>;
}
