import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinkRepository } from './link.repository';
import { LinkService } from './link.service';

const sampleUrl = 'http://example.com';
const sampleDto: LinkDTO = {
  url: sampleUrl,
};
const sampleLink = new Link();
sampleLink.url = sampleUrl;

describe('LinkService', () => {
  let service: LinkService;
  let repository: LinkRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: getRepositoryToken(Link),
          useValue: createMock<LinkRepository>({
            findOneOrFail: jest.fn().mockResolvedValue(sampleLink),
            create: jest.fn().mockReturnValue(sampleLink),
          }),
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
    repository = module.get<LinkRepository>(getRepositoryToken(Link));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertOne', () => {
    it('should create a link', () => {
      expect(service.insertOne(sampleDto)).resolves.toEqual(sampleLink);
      expect(repository.create).toBeCalledTimes(1);
      expect(repository.create).toBeCalledWith(sampleDto);
      expect(repository.save).toBeCalledTimes(1);
    });
  });

  describe('getOneByCode', () => {
    it('should get one link', () => {
      const repoSpy = jest.spyOn(repository, 'findOneOrFail');
      expect(service.getOneByCode('foo')).resolves.toEqual(sampleLink);
      expect(repoSpy).toBeCalledWith({ code: 'foo' });
    });
  });
});
