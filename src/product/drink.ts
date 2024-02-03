import { IsOptional, Max } from 'class-validator';
import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum MilkType {
  HEAVYCREAM = 'heavy cream',
  VANILLASWEETCREAM = 'vanilla sweet cream',
}

export enum MilkTemp {
  WARM = 'warm',
  STEAMEDHOT = 'steam hot',
  EXTRAHOT = 'extra hot',
}

export enum ExpressoType {
  BLONDEEXPRESSOROAST = 'blond expresso roast',
  DECAFEXPRESSOROAST = 'decaf expresso raost',
}

export enum ShotOption1 {
  NONE = 'none',
  UPSIDEDOWN = 'upside down',
}

export enum ShotOption2 {
  NONE = 'none',
  RISTRETTO = 'ristretto',
  LONGSHOT = 'long shot',
}

export enum ToppingOptions {
  CARAMELCRUNCH = 'caramel crunch',
  CHOCOLATECURLS = 'chocolate curls',
}

export enum ColdFoam {
  CINNAMONSWEETCREAM = 'cinnamon sweet cream',
  MATCHACREAM = 'matcha cream',
}

export enum ToppingWeight {
  EXTRA = 'extra',
  LIGHT = 'light',
  NONE = 'none',
  REGULAR = 'regular',
}

export class Milk {
  @Column()
  milkType: MilkType;

  @Column()
  milkTemp: MilkTemp;
}

export class Expresso {
  @Column()
  expressoType: ExpressoType;

  @Column()
  @Max(12)
  numExpressoShots: number;

  @IsOptional()
  @Column()
  shotOption1: ShotOption1;

  @IsOptional()
  @Column()
  shotOption2: ShotOption2;
}

export class Toppings {
  @IsOptional()
  @Column()
  toppingOptions: [
    {
      type: ToppingOptions;
      weight: ToppingWeight;
    },
  ];

  @IsOptional()
  @Column()
  coldFoam: [
    {
      type: ColdFoam[];
      weight: ToppingWeight;
    },
  ];
}

export class Drink {
  @Column()
  category: string = 'Drink';

  @Column()
  menuName: string;

  @Column()
  itemName: string;

  @Column()
  size: string;

  @IsOptional()
  @Column()
  milk: Milk;

  @IsOptional()
  @Column()
  expresso: Expresso;

  @IsOptional()
  @Column()
  toppins: Toppings;
}
