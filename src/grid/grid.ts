import { Entity, Vector2D } from "@/utils";
import { Node } from "@/node";
import { Settings } from "@/settings";
import { GridOnClickComponent } from "./components";

export class Grid extends Entity {
  private _nodes: Node[] = []

  public get Nodes(): Node[] {
    return this._nodes
  }

  public Awake(): void {
    this.AddComponent(new GridOnClickComponent())
    
    super.Awake() // components

    this.InitNodes()

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

  private InitNodes(): void {
    const size = Settings.grid.nodeSize
    const offset = Settings.grid.nodeOffset
    for (let y = 0; y < Settings.grid.dimension; y++) {
      for (let x = 0; x < Settings.grid.dimension; x++) {
        const start = new Vector2D(
          x * (size + offset) + offset,
          y * (size + offset) + offset
        )

        const end = new Vector2D(
          start.x + size,
          start.y + size
        )

        const index = new Vector2D(x, y)

        const node = new Node(start, end, index)
        this._nodes.push(node)
      }
    }
  }
}