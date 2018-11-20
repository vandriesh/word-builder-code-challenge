import { getIntermediatePaths, WordUtil } from './word-util';
import { getNodes } from './graph-connection-feature.spec';
import { getCharGraphInstance } from './char-graph';

describe('Graph', () => {
    let wordUtil, nodes, graph;

    beforeEach(() => {
        nodes = getNodes().entities;
        graph = getCharGraphInstance();
        graph.addNodes(nodes);
        wordUtil = new WordUtil(graph);
    });

    it('should add nodes and compose a word from a path', () => {
        expect(wordUtil.buildWord([0, 1, 3])).toEqual('PRO');
        expect(wordUtil.buildWord([0, 3, 1, 2])).toEqual('PORA');
    });

    it('should generate all routes between nodes in a path', function() {
        const out = getIntermediatePaths([0, 1, 2, 3]);

        expect(out[0]).toEqual([0, 1]);
        expect(out[1]).toEqual([0, 1, 2]);
        expect(out[2]).toEqual([0, 1, 2, 3]);
        expect(out[3]).toEqual([1, 2]);
        expect(out[4]).toEqual([1, 2, 3]);
        expect(out[5]).toEqual([2, 3]);
    });
});
