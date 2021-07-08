import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

const sampleUrl = 'http://example.com';
const sampleDto: LinkDTO = {
  url: sampleUrl,
};
const sampleLink = {
  id: 1,
  ...sampleDto,
} as Link;

describe('LinksController', () => {
  let controller: LinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinksController],
      providers: [
        {
          provide: LinksService,
          useValue: createMock<LinksService>({
            insertOne: jest
              .fn()
              .mockImplementation((link: LinkDTO) =>
                Promise.resolve({ id: 1, ...link })
              ),
          }),
        },
      ],
    }).compile();

    controller = module.get<LinksController>(LinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createLink', () => {
    it('should create a new link', async () => {
      await expect(controller.createLink(sampleDto)).resolves.toEqual(
        sampleLink
      );
    });
  });
});
