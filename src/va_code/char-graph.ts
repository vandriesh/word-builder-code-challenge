import { CharNode, GraphNode } from './models';
import { GraphConnectionFeature } from './graph-connection-feature';
import { EntityStorage } from './entity-storage';

export function buildNode<T extends GraphNode>(node, id: number): T {
    return {
        ...node,
        id,
        links: [],
    };
}

export class Graph<T extends GraphNode> {
    private container: EntityStorage<T> = new EntityStorage<T>();
    private connectionFeature: GraphConnectionFeature<
        T
    > = new GraphConnectionFeature<T>();
    private ids = 0;

    addChar(name: string): T {
        const node: T = buildNode<T>({ name }, this.ids++);

        this.container.addItem(node);

        return node;
    }

    linkNodes(node: T, neighbors: T[]) {
        this.connectionFeature.linkNodes(node, neighbors);
    }

    getNode(id: number): T {
        return this.container.getItem(id);
    }

    addNodes(nodes: T[]) {
        this.container.addItems(nodes);
    }
}

export function getCharGraphInstance() {
    return new Graph<CharNode>();
}
