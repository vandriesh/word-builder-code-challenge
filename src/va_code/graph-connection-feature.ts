import { GraphNode } from './models';

const contains = (array, value) => array.indexOf(value) !== -1;

export class GraphConnectionFeature<T extends GraphNode> {
    linkNodes(node: T, neighbors: T[]) {
        const neighborIds: number[] = neighbors
            .filter((neighbor: T) => !contains(neighbor.links, node.id))
            .map((neighbor: T) => neighbor.id);

        if (!node.links.length) {
            node.links = [...neighborIds];
        } else {
            node.links = [...node.links, ...neighborIds];
        }

        // link back (2 way link)
        neighbors
            .filter((neighbor: T) => !contains(neighbor.links, node.id))
            .forEach((neighbor: T) => {
                neighbor.links = [...neighbor.links, node.id];
            });
    }
}
