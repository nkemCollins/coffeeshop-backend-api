import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class MyUser {
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  nickname: string = 'test';
}
