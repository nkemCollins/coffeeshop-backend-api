import { IsString, IsObject } from 'class-validator';
import { Item } from '../menu.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsObject()
  item: Item;
}
