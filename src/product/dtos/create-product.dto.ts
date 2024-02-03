import { IsString, IsObject } from 'class-validator';
import { Drink } from '../drink';
import { Food } from '../food';
import { HomeCoffee } from '../homecoffee';
import { Merchandise } from '../merchandise';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

  @ApiProperty()
  @IsObject()
  product: Drink | Food | HomeCoffee | Merchandise;
}
