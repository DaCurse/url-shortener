import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseGuards(ThrottlerGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/create')
  createLink(@Body(ValidationPipe) link: LinkDTO): Promise<Link> {
    return this.linkService.insertOne(link);
  }
}
