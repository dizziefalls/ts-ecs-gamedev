import { Grid } from "@/grid/grid";
import { OnClickComponent, Vector2D } from "@/utils";

export class GridOnClickComponent extends OnClickComponent {
  public Entity: Grid

  public Awake(): void {
    
  }

  public Update(deltaTime: number): void {
    
  }

  public ClickOn(point: Vector2D): void {
    for (const node of this.Entity.Nodes) {
      node.IsActive = node.Occupies(point)
    }
  }
}