import { EntityStorage } from './entity-storage';
import { GraphNode } from './models';

interface MyNode extends GraphNode {
    myProperty: 'myValue';
}

describe('EntityStorage', () => {
    let container: EntityStorage<MyNode>;
    const node1: MyNode = { id: 1 } as MyNode;
    const node2: MyNode = { id: 2 } as MyNode;

    beforeEach(() => {
        container = new EntityStorage<MyNode>();
    });

    it('should be empty', () => {
        expect(container.getItems()).toEqual([]);
    });

    it('should add object to collection', () => {
        container.addItem(node1);
        container.addItem(node2);
        container.addItem(node1);

        const out = container.getItems();
        expect(out).toEqual([{ id: 1 } as MyNode, { id: 2 } as MyNode]);
    });

    it('should beable to amultiple items', function() {
        container.addItems([node1, node2, node1]);

        const out = container.getItems();
        expect(out[0].id).toEqual(1);
        expect(out[1].id).toEqual(2);
        expect(out.length).toEqual(2);
    });
});
