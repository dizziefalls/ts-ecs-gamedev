import { Color, IComponent, Vector2D } from "@/utils";
import { Node } from "@/node/node";
import { Settings } from "@/settings";
import { CanvasLayer } from "@/canvas-layer";

export class NodeDrawComponent implements IComponent {
  public Entity: Node

  public Awake(): void {
    this.Clear()
  }

  public Update(deltaTime: number): void {
    this.Clear()
    this.Draw() 
    this.DrawDebugInfo()
  }

  private Draw(): void {
    CanvasLayer.Background.FillRect(
      this.Entity.Start,
      this.Entity.Size,
      this.Entity.IsInLocomotionRange ? Settings.grid.color.inLocomotionRange : Settings.grid.color.regular
    )
  }

  private DrawDebugInfo(): void {
    if (!Settings.debugMode) {
      return
    }
    const entity = this.Entity
    CanvasLayer.Background.DrawText(
      entity.Index.AsString(),
      entity.Start,
      new Color(255, 0, 0, 1)
    )

    if (this.Entity.Ship) {
      CanvasLayer.Background.DrawText(
        'Ship',
        new Vector2D(entity.Start.x + 40, entity.Start.y),
        new Color(255, 0, 0, 1)
      )
    }
  }

  private Clear(): void {
    CanvasLayer.Background.ClearRect(
      this.Entity.Start,
      this.Entity.Size
    )
  }
}