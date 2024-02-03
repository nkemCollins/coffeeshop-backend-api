import { Expose } from 'class-transformer';
import { Item } from '../menu.entity';

export class SpecificMenuItems {
  @Expose()
  item: {
    itemName: string;
    calories: number;
  };
}
