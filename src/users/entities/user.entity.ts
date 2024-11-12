import { randomUUID } from 'node:crypto';

export class User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(login: string, password: string) {
    this.id = randomUUID();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  updatePassword(newPassword: string): void {
    this.password = newPassword;
    this.version++;
    this.updatedAt = Date.now();
  }
}
