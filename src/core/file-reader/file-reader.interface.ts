export interface FileReaderInterface {
  readonly file: string;
  read(): void;
}
