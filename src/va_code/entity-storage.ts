import { Node } from './models';

export class EntityStorage<T extends Node> {
    private entities = {};
    private entityIds: number[] = [];

    addItem(node: T) {
        if (this.entities[node.id]) {
            return;
        }

        this.entities[node.id] = node;
        this.entityIds.push(node.id);
    }

    addItems(nodes: T[]) {
        nodes.forEach((node: T) => this.addItem(node));
    }

    getItem(id: number): T {
        return this.entities[id];
    }

    getItems(): T[] {
        return this.entityIds.map((id: number) => this.entities[id]);
    }
}
