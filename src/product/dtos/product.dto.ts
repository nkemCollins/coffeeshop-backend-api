import { Exclude, Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { HomeCoffee } from '../homecoffee';
import { Merchandise } from '../merchandise';
import { Drink } from '../drink';
import { Food } from '../food';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  @Expose()
  product: Drink | Food | HomeCoffee | Merchandise;

  @ApiProperty()
  @Transform(({ obj }) => obj._id)
  @Expose()
  userId: User;
}
