export type Node = Element | Text;
export type Element = {
  children: Node[];
  [key: string]: unknown;
};
export type Text = {
  text: string;
  [key: string]: unknown;
};
