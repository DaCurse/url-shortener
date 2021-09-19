import { Controller, Get, Param, Res, UseFilters } from '@nestjs/common';
import { Response } from 'express';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { LinkService } from '../link/link.service';
import { RedirectService } from './redirect.service';

@Controller()
export class RedirectController {
  constructor(
    private readonly redirectService: RedirectService,
    private readonly linkService: LinkService
  ) {}

  @Get('/:code')
  @UseFilters(HttpExceptionFilter)
  async redirect(@Param('code') code: string, @Res() res: Response) {
    const decodedCode = this.redirectService.tryDecode(code);
    const link = await this.linkService.getOneByCode(decodedCode);
    this.linkService.incrementVisitCount(decodedCode);
    res.redirect(link.url);
  }
}
