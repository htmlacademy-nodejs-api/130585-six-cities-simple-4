import { WriteStream, createWriteStream } from 'node:fs';
import { FileWriterInterface } from '@core/file-writer/file-writer.interface.js';
import { CHUNK_SIZE_64KB, ENCODING_UTF8 } from '@const/common.js';

export default class FileWriterTsv implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly file: string) {
    this.stream = createWriteStream(this.file, {
      flags: 'w',
      encoding: ENCODING_UTF8,
      autoClose: true,
      highWaterMark: CHUNK_SIZE_64KB,
    });
  }

  public async write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
