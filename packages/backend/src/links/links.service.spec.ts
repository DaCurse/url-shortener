import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { LinksRepository } from './links.repository';
import { LinksService } from './links.service';

const sampleUrl = 'http://example.com/';
const sampleDto = {
  url: sampleUrl,
};
const sampleLink = new Link();
sampleLink.url = sampleUrl;

describe('LinksService', () => {
  let service: LinksService;
  let repository: LinksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: getRepositoryToken(Link),
          useValue: createMock<LinksRepository>({
            findOneOrFail: jest.fn().mockResolvedValue(sampleLink),
            create: jest.fn().mockReturnValue(sampleLink),
          }),
        },
      ],
    }).compile();

    service = module.get<LinksService>(LinksService);
    repository = module.get<LinksRepository>(getRepositoryToken(Link));
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
