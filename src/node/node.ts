import { Ship } from "@/ship";
import { Entity, Vector2D } from "@/utils";
import { NodeDrawComponent } from "./components";

export class Node extends Entity {
  // @todo replace temp prop with real deal dog
  public IsActive = true
  public Ship: Ship | null = null
  public IsInLocomotionRange = false

  public get Size(): Vector2D {
    return new Vector2D(
      this.End.x - this.Start.x,
      this.End.y - this.Start.y
    )
  }

  public get Center(): Vector2D {
    return new Vector2D(
      this.Start.x + this.Size.x / 2,
      this.Start.y + this.Size.y / 2
    )
  }
  
  constructor(
    public readonly Start: Vector2D,
    public readonly End: Vector2D,
    public readonly Index: Vector2D,
    public readonly Neighbors: Node[]
    ) {
      super()
    }
    
  public Awake(): void {
    this.AddComponent(new NodeDrawComponent())

    super.Awake()
  }

  public Occupies(point: Vector2D): boolean {
    if (point.x < this.Start.x) {
      return false
    }

    if (point.x > this.End.x) {
      return false
    }

    if (point.y < this.Start.y) {
      return false
    }

    if (point.y > this.End.y) {
      return false
    }

    return true
  }

  //Given a range, set IsInLocomotionRange: true for the current node, then recursively call it on all neighbors until the range is expired.
  public FindAndSetInLocomotionRange(range: number): void {
    if (!this.Ship) {
      this.IsInLocomotionRange = true
    }
    const newRange = --range
    if (newRange <= 0) {
      return
    }

    console.log(this.Neighbors)
    this.Neighbors
      .filter(neighbor => !neighbor.Ship)
      .map(neighbor => neighbor.FindAndSetInLocomotionRange(range))
  }
}