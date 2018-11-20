import { CharNode, GraphNode } from './models';
import { Graph } from './char-graph';

export class WordUtil {
    constructor(private graph: Graph<CharNode>) {}

    buildWord(path: number[]) {
        return path.reduce(this.concatReducer, '');
    }

    private concatReducer = (word, id) => word + this.graph.getNode(id).name;
}

export function visited(id, path) {
    return path.indexOf(id) !== -1;
}

export function buildPath<T extends GraphNode>(
    currentNode: T,
    path,
    possibleCombinations,
    graph: Graph<CharNode>
) {
    let adjacentNodes = currentNode.links;

    adjacentNodes = adjacentNodes.filter(n => !visited(n, path));

    if (path) {
        path.push(currentNode.id);
    }

    if (!adjacentNodes.length) {
        possibleCombinations.push(path);
        return;
    }

    adjacentNodes.forEach(function(id: number) {
        buildPath(
            graph.getNode(id),
            path.slice(0),
            possibleCombinations,
            graph
        );
    });
}

export function getIntermediatePaths(arr) {
    const paths = [];

    for (let start = 0; start < arr.length; start += 1) {
        for (let end = start + 1; end < arr.length; end += 1) {
            const path = arr.slice(start, end + 1);

            paths.push(path);
        }
    }

    return paths;
}
