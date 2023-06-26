export interface FileWriterInterface {
  readonly file: string;

  write(row: string): void;

  end(): void;
}
