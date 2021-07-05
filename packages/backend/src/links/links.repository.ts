import { EntityRepository, Repository } from 'typeorm';
import { Link } from './link.entity';

@EntityRepository(Link)
export class LinksRepository extends Repository<Link> {}
