export default interface TableField {
  id: number;
  line: number;
  column: number;
  value: string;
  tags: Array<number>;
}
