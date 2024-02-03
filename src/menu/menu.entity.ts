import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

export class Item {
  @ApiProperty()
  @Column()
  menuName: string;

  @ApiProperty()
  @Column()
  itemName: string;

  @ApiProperty()
  @Column()
  @IsOptional()
  calories: number;
}

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty()
  @Column()
  category: string;

  @ApiProperty()
  @Column((type) => Item)
  item: Item;
}
