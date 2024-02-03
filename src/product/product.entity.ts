import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectId,
  ObjectIdColumn,
  ManyToOne,
} from 'typeorm';
import { Food } from './food';
import { Drink } from './drink';
import { HomeCoffee } from './homecoffee';
import { Merchandise } from './merchandise';
import { User } from 'src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty()
  @Column('json')
  product: Drink | Food | HomeCoffee | Merchandise;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
