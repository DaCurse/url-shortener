import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinksService } from './links.service';

@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('/create')
  createLink(@Body(ValidationPipe) link: LinkDTO): Promise<Link> {
    return this.linksService.insertOne(link);
  }
}
