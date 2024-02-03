import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(firstname: string, lastname: string, email: string, password: string) {
    const user = this.repo.create({ firstname, lastname, email, password });

    return this.repo.save(user);
  }

  //find by id
  findOne(id: string) {
    if (!id) {
      return null;
    }
    const objectId = new ObjectId(id);
    return this.repo.findOneBy({ _id: objectId });
  }

  //find by email
  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  //update
  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user no found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  //remove
  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }

  // set admin
  async setAdmin(id: string, admin: boolean) {
    if (!id) {
      return null;
    }
    const objectId = new ObjectId(id);
    const user = await this.repo.findOne({ where: { _id: objectId } });

    console.log(user);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.admin = admin;
    return this.repo.save(user);
  }
}
