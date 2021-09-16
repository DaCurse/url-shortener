import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { Link } from '../link/link.entity';
import { LinkService } from '../link/link.service';
import { RedirectController } from './redirect.controller';

const sampleUrl = 'http://example.com';
const sampleCode = 'foo';
const sampleLink = {
  id: 1,
  code: sampleCode,
  url: sampleUrl,
  visitCount: 0,
} as Link;

describe('RedirectController', () => {
  let controller: RedirectController;
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RedirectController],
      providers: [
        {
          provide: LinkService,
          useValue: createMock<LinkService>({
            getOneByCode: jest
              .fn()
              .mockImplementation((code: Link['code']) =>
                Promise.resolve({ ...sampleLink, code })
              ),
          }),
        },
      ],
    }).compile();

    controller = module.get<RedirectController>(RedirectController);
    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('redirect', () => {
    it('should get a link, redirect to it and increment visit count', async () => {
      const res = createMock<Response>();
      const incrementSpy = jest.spyOn(service, 'incrementVisitCount');

      await controller.redirect(sampleCode, res);

      expect(incrementSpy).toBeCalledTimes(1);
      expect(incrementSpy).toBeCalledWith(sampleCode);
      expect(res.redirect).toBeCalledTimes(1);
      expect(res.redirect).toBeCalledWith(sampleLink.url);
    });
  });
});
