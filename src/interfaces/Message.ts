export default interface Message {
  type: 'error' | 'success' | 'warning';
  body: string;
}
