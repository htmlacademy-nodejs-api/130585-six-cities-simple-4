import { WriteStream, createWriteStream } from 'node:fs';

import { FileWriterInterface } from '@core/file-writer/file-writer.interface.js';
import { ChunkSize, Encoding } from '@const/common.js';

export default class FileWriterTsv implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly file: string) {
    this.stream = createWriteStream(this.file, {
      flags: 'w',
      encoding: Encoding.Utf8,
      autoClose: true,
      highWaterMark: ChunkSize['64KB'],
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${ row }\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }

  public end(): void {
    if (!this.stream.writableEnded) {
      this.stream.end();
    }
  }
}
