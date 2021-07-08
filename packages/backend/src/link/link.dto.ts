import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class LinkDTO {
  @IsNotEmpty()
  @IsUrl()
  url: string;
  @IsOptional()
  @IsNotEmpty()
  code?: string;
}
