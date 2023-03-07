export default interface TableEntry {
  id: number;
  line: number;
  column: number;
  value: string;
  tags: Array<number>;
}
