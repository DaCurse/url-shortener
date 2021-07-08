import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinkRepository } from './link.repository';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link) private readonly linkRepository: LinkRepository
  ) {}

  async insertOne(link: LinkDTO): Promise<Link> {
    const newLink = this.linkRepository.create(link);
    await this.linkRepository.save(newLink);
    return newLink;
  }

  async getOneByCode(code: Link['code']): Promise<Link> {
    try {
      return await this.linkRepository.findOneOrFail({ code });
    } catch {
      throw new NotFoundException('Link not found');
    }
  }
}
