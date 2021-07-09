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
const sampleCode = 'foo';
const sampleLink = {
  id: 1,
  code: sampleCode,
  url: sampleUrl,
  visitCount: 0,
} as Link;

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
      expect(service.getOneByCode(sampleCode)).resolves.toEqual(sampleLink);
      expect(repoSpy).toBeCalledWith({ code: 'foo' });
    });
  });

  describe('incrementVisitCount', () => {
    it('should create a query that increments the visit count', async () => {
      const repoSpy = jest
        .spyOn(repository, 'createQueryBuilder')
        .mockReturnValue({
          update: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          execute: jest.fn(),
        } as any);

      await service.incrementVisitCount(sampleCode);
      expect(repoSpy).toBeCalledTimes(1);

      const queryBuilder = repoSpy.mock.results[0].value;
      expect(queryBuilder.update).toBeCalledTimes(1);
      expect(queryBuilder.set).toBeCalledTimes(1);
      expect(queryBuilder.set).toBeCalledWith({
        visitCount: expect.any(Function),
      });
      expect(queryBuilder.where).toBeCalledTimes(1);
      expect(queryBuilder.where).toBeCalledWith(expect.any(String), {
        code: sampleCode,
      });
      expect(queryBuilder.execute).toBeCalledTimes(1);
    });
  });
});
