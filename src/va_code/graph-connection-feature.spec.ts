import { CharNode } from './models';
import { getCharGraphInstance } from './char-graph';

export function getNodes() {
    const letterGraph = getCharGraphInstance();

    const p: CharNode = letterGraph.addChar('P');
    const r: CharNode = letterGraph.addChar('R');
    const a: CharNode = letterGraph.addChar('A');
    const o: CharNode = letterGraph.addChar('O');

    // P0 <----> R1 <----> A2
    // ^         ^
    // |         |
    // |         v
    // +-------> O3

    letterGraph.linkNodes(p, [r, o]);
    letterGraph.linkNodes(r, [a, o]);
    letterGraph.linkNodes(o, [r]);

    // return [p, r, o];
    return { p, r, a, o, entities: [p, r, a, o] };
}

export function getNodesForUseCase2() {
    const letterGraph = getCharGraphInstance();

    const p: CharNode = letterGraph.addChar('P');
    const r: CharNode = letterGraph.addChar('R');
    const o: CharNode = letterGraph.addChar('O');

    // P0 <----> R1
    //           ^
    //           |
    //           v
    //           O2

    letterGraph.linkNodes(p, [r]);
    letterGraph.linkNodes(r, [o]);

    // return [p, r, o];
    return { p, r, o, entities: [p, r, o] };
}

describe('Link feature', () => {
    let nodes;

    beforeEach(() => {
        nodes = getNodes();
    });

    it('"P" should link to r and o only', () => {
        const { p } = nodes;

        expect(p.name).toEqual('P');
        expect(p.id).toEqual(0);
        expect(p.links).toEqual([1, 3]);
    });

    it('"R" should link to r and o only', () => {
        const { r } = nodes;

        expect(r.name).toEqual('R');
        expect(r.id).toEqual(1);
        expect(r.links).toEqual([0, 2, 3]);
    });

    it('"A" should link to r', () => {
        const { a } = nodes;

        expect(a.name).toEqual('A');
        expect(a.id).toEqual(2);
        expect(a.links).toEqual([1]);
    });

    it('"O" should link to r', () => {
        const { o } = nodes;

        expect(o.name).toEqual('O');
        expect(o.id).toEqual(3);
        expect(o.links).toEqual([0, 1]);
    });
});
