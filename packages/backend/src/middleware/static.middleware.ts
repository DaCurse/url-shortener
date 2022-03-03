import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import { join } from 'path';
import { STATIC_ROOT_PATH } from '../config/static.config';

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const rootPath = join(__dirname, STATIC_ROOT_PATH);
    const clientPath =
      req.path === '/'
        ? StaticMiddleware.getIndexFilePath(rootPath)
        : join(rootPath, req.path);

    try {
      const stat = await fs.stat(clientPath);
      if (clientPath.startsWith(rootPath) && stat.isFile()) {
        res.sendFile(clientPath);
      } else {
        next();
      }
    } catch {
      next();
    }
  }

  private static getIndexFilePath(rootPath: string): string {
    return join(rootPath, 'index.html');
  }
}
