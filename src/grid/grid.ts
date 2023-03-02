import { Entity } from "@/utils";
import { Node } from "@/node";

export class Grid extends Entity {
  private _nodes: Entity[] = []

  public get Nodes(): Node[] {
    return this._nodes
  }

  public Awake(): void {
    super.Awake() // components

    for (const node of this._nodes) { // children
      node.Awake()
    }
  }

  public Update(deltaTime: number): void {
    super.Update(deltaTime)

    for (const node of this._nodes) {
      node.Update(deltaTime)
    }
  }
}