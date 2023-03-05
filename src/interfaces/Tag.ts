export default interface Tag {
  id: number;
  name: string;
  children: Tag[];
  parent_id?: number;
}
