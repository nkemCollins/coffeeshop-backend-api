import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MyUser } from './myuser.entity';
//import { ObjectId } from 'mongodb';

@Injectable()
export class MyUsersService {
  constructor(@InjectRepository(MyUser) private repo: Repository<MyUser>) {}

  create(firstname: string, lastname: string, nickname: string ) {
    const user = this.repo.create({ firstname, lastname, nickname });
    return this.repo.save(user);
  }
}
