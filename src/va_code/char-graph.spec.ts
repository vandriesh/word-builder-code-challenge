import { buildNode, getCharGraphInstance } from './char-graph';
import { getNodes, getNodesForUseCase2 } from './graph-connection-feature.spec';
import { buildPath, getIntermediatePaths, WordUtil } from './word-util';
import { Dictionary } from './dictionary';
import { Node } from './models';
import { EntityStorage } from './entity-storage';

describe('Char Graph', function() {
    let nodes, graph, wordUtil;
    let globalDictionary;

    beforeEach(() => {
        nodes = getNodes().entities;
        graph = getCharGraphInstance();

        globalDictionary = new Dictionary();

        globalDictionary.addWords(['qwe', 'aaa', 'PRO', 'PORA']);
    });

    it('should build CharNode', function() {
        const out = buildNode({ name: 'a' }, 1);

        expect(out).toEqual({
            name: 'a',
            id: 1,
            links: [],
        });
    });

    it('should find all existing words', () => {
        graph.addNodes(nodes);
        wordUtil = new WordUtil(graph);

        const longestPathResults = [];
        const possibleCombinations = [];
        const possibleWords = [];

        nodes.forEach(node => {
            const combinations = [];
            buildPath(node, [], combinations, graph);
            longestPathResults.push({
                node,
                combinations,
            });
            combinations.forEach(path => possibleCombinations.push(path));
        });

        const pathContainer = new EntityStorage<Node>();

        possibleCombinations.forEach((path, i) => {
            const item: Node = { id: path.join('-'), path } as Node;
            pathContainer.addItem(item);

            const intermediatePaths = getIntermediatePaths(path);

            intermediatePaths.forEach(intermediatePath => {
                const intermediateIem: Node = {
                    id: intermediatePath.join('-'),
                    path: intermediatePath,
                } as Node;
                pathContainer.addItem(intermediateIem);
            });
        });

        pathContainer.getItems().forEach(({ path }: any) => {
            const word = wordUtil.buildWord(path);
            possibleWords.push(word);
        });

        const existingWords = possibleWords.filter((word: string) =>
            globalDictionary.contains(word)
        );

        expect(existingWords).toEqual(['PRO', 'PORA']);

        console.log('UC1: all words words', possibleWords);
        console.log('UC1: global dictionary', globalDictionary.getWords());
        console.log('UC1: existing words', existingWords);
    });

    it('should generate all possible paths', () => {
        const nodes2 = getNodesForUseCase2().entities;
        graph.addNodes(nodes2);
        wordUtil = new WordUtil(graph);

        const longestPathResults = [];
        const possibleCombinations = [];
        const possibleWords = [];

        nodes2.forEach(node => {
            const combinations = [];
            buildPath(node, [], combinations, graph);
            longestPathResults.push({
                node,
                combinations,
            });
            combinations.forEach(path => possibleCombinations.push(path));
        });

        const pathContainer = new EntityStorage<Node>();

        possibleCombinations.forEach((path, i) => {
            const item: Node = { id: path.join('-'), path } as Node;
            pathContainer.addItem(item);

            const intermediatePaths = getIntermediatePaths(path);

            intermediatePaths.forEach(intermediatePath => {
                const intermediateIem: Node = {
                    id: intermediatePath.join('-'),
                    path: intermediatePath,
                } as Node;
                pathContainer.addItem(intermediateIem);
            });
        });

        const allPaths = [];
        pathContainer.getItems().forEach(({ path }: any) => {
            allPaths.push(path);
            const word = wordUtil.buildWord(path);
            possibleWords.push(word);
        });

        expect(allPaths).toEqual([
            [0, 1, 2],
            [0, 1],
            [1, 2],
            [1, 0],
            [2, 1, 0],
            [2, 1],
        ]);

        const existingWords = possibleWords.filter((word: string) =>
            globalDictionary.contains(word)
        );

        expect(existingWords).toEqual(['PRO']);

        console.log('UC2: all words words', possibleWords);
        console.log('UC2: global dictionary', globalDictionary.getWords());
        console.log('UC2: existing words', existingWords);
    });
});
