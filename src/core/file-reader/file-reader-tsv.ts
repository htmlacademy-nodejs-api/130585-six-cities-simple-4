import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';

import { FileReaderInterface } from './file-reader.interface.js';
import { ChunkSize, Encoding } from '@const/common.js';

export default class FileReaderTSV extends EventEmitter implements FileReaderInterface {
  constructor(public file: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.file, {
      highWaterMark: ChunkSize['16KB'],
      encoding: Encoding.Utf8,
    });

    let data = '';
    let nextLineStart = -1;
    let importedRowCount = 0;

    this.emit('start', this.file);

    for await (const chunk of stream) {
      data += chunk.toString();
      nextLineStart = data.indexOf('\n');

      while (nextLineStart >= 0) {
        const completeRow = data.slice(0, nextLineStart + 1);

        data = data.slice(++nextLineStart);
        importedRowCount++;
        nextLineStart = data.indexOf('\n');

        await new Promise((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
