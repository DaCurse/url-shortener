import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  createLink(@Body(ValidationPipe) link: LinkDTO): Promise<Link> {
    return this.linkService.insertOne(link);
  }
}
