import { IsBoolean } from 'class-validator';

export class SetAdminDto {
  @IsBoolean()
  admin: boolean;
}
