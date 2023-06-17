import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import { IMAGE_MAX_SIZE } from '@const/validation.js';

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    private maxCount: number = 1,
  ) {
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const ext = extension(file.mimetype);
        const name = nanoid();

        callback(null, `${ name }.${ ext }`);
      },
    });

    const uploadSingleFileMiddleware = multer({
      storage,
      limits: {
        fileSize: IMAGE_MAX_SIZE,
      },
    })[this.maxCount > 1 ? 'array' : 'single'](this.fieldName, this.maxCount);

    uploadSingleFileMiddleware(req, res, next);
  }
}
