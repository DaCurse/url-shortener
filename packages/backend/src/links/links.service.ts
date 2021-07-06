import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinksRepository } from './links.repository';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linksRepository: LinksRepository
  ) {}

  async createLink(link: LinkDTO): Promise<Link> {
    const newLink = this.linksRepository.create(link);
    await this.linksRepository.save(newLink);
    return newLink;
  }
}
