import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { LinkService } from '../link/link.service';

@Controller()
export class RedirectController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/:code')
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const link = await this.linkService.getOneByCode(code);
    this.linkService.incrementVisitCount(code);
    res.redirect(link.url);
  }
}
