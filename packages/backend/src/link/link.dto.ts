import { IsNotEmpty, IsOptional, IsUrl, Length } from 'class-validator';
import { MAX_CODE_LENGTH } from 'src/config/link.config';

export class LinkDTO {
  @IsNotEmpty()
  @IsUrl()
  url: string;
  @IsOptional()
  @IsNotEmpty()
  @Length(1, MAX_CODE_LENGTH)
  code?: string;
}
