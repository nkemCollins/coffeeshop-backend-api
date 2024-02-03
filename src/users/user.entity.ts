import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/product.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectId,
  ObjectIdColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  @ObjectIdColumn()
  _id: ObjectId;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  admin: boolean = false;

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];

  //   @AfterInsert()
  //   logInsert() {
  //     console.log('Inserted User with id', this._id);
  //   }

  //   @AfterUpdate()
  //   logUpdate() {
  //     console.log('Upadted User with id', this._id);
  //   }

  //   @AfterRemove()
  //   logRemove() {
  //     console.log('Removed User with id', this._id);
  //   }
}
