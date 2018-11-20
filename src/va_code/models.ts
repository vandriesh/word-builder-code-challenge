
export interface Node {
  id: number;
}


export interface GraphNode extends Node {
  links: number[];
}

export interface CharNode extends GraphNode {
  name: string;
}
