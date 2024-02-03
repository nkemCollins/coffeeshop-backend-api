import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item, Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private repo: Repository<Menu>) {}

  create(category: string, item: Item) {
    const menuitem = this.repo.create({ category, item });

    return this.repo.save(menuitem);
  }

  async displayMenuItems() {
    const menu = await this.repo.find();
    const uniqueitem = new Set<string>();

    menu.forEach((menuitem) => {
      if (menuitem.item && menuitem.item.menuName) {
        uniqueitem.add(menuitem.category + ': ' + menuitem.item.menuName);
      }
    });
    return Array.from(uniqueitem);
  }

  async listSpecificMenuItems(menuName: string) {
    const items = await this.repo.find({
      where: {
        'item.menuName': menuName,
      } as any,
    });

    return items.map((prod) => ({
      item: {
        itemName: prod.item.itemName,
        calories: prod.item.calories,
      },
    }));
  }
}
