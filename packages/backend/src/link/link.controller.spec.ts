import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { LinkController } from './link.controller';
import { LinkDTO } from './link.dto';
import { Link } from './link.entity';
import { LinkService } from './link.service';

const sampleUrl = 'http://example.com';
const sampleDto: LinkDTO = {
  url: sampleUrl,
};
const sampleLink = {
  id: 1,
  ...sampleDto,
} as Link;

describe('LinkController', () => {
  let controller: LinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        {
          provide: LinkService,
          useValue: createMock<LinkService>({
            insertOne: jest
              .fn()
              .mockImplementation((link: LinkDTO) =>
                Promise.resolve({ id: 1, ...link })
              ),
          }),
        },
      ],
    }).compile();

    controller = module.get<LinkController>(LinkController);
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
