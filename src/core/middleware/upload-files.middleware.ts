import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage, FileFilterCallback } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';

import { MiddlewareInterface } from '@core/middleware/middleware.interface.js';
import HttpError from '@core/errors/http-error.js';
import { IMAGE_MAX_SIZE, IMAGE_EXT_MATCH_PATTERN } from '@const/validation.js';
import { HttpErrorText } from '@const/error-messages.js';

export class UploadFilesMiddleware implements MiddlewareInterface {
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

    const uploadFilesMiddleware = multer({
      storage,
      limits: {
        fileSize: IMAGE_MAX_SIZE,
      },
      fileFilter(_req: Request, file: Express.Multer.File, callback: FileFilterCallback) {
        const ext = extension(file.mimetype);

        if (!ext || !IMAGE_EXT_MATCH_PATTERN.test(ext)) {
          return callback(new HttpError(
            StatusCodes.UNSUPPORTED_MEDIA_TYPE,
            HttpErrorText.UnsupportedMediaType,
            'UploadFileMiddleware',
          ));
        }

        callback(null, true);
      },
    })[this.maxCount > 1 ? 'array' : 'single'](this.fieldName, this.maxCount);

    uploadFilesMiddleware(req, res, next);
  }
}
