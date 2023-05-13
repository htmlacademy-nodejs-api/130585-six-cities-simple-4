export function getTypedServerField<T>(serverValue: string, checkedArray: readonly T[]): T | undefined {
  return checkedArray.find((item) => item === serverValue);
}
