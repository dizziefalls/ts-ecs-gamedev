import { CanvasLayer } from "@/canvas-layer";
import { Settings } from "@/settings";
import { Ship } from "@/ship/ship";
import { Team } from "@/team";
import { IComponent, Vector2D } from "@/utils";

export class ShipDrawComponent implements IComponent {
  public Entity: Ship

  private get Position(): Vector2D {
    return new Vector2D(50, 50) // Move to new calc or comp. Center of circle
  }

  public Awake(): void {
    this.Clear()
  }

  public Update(deltaTime: number): void {
    this.Clear()
    this.Draw()
  }

  private Clear(): void {
    CanvasLayer.Foreground.ClearRect(
      new Vector2D(
        this.Position.x - Settings.grid.nodeSize / 2, //top-left corner since we're in the center
        this.Position.y - Settings.grid.nodeSize / 2
      ),
      new Vector2D(Settings.grid.nodeSize, Settings.grid.nodeSize)
    )
  }
  private Draw(): void {
    const colors = Settings.ships.colors
    const color = this.Entity.Factory.Team === Team.A ? colors.a : colors.b
    CanvasLayer.Foreground.FillCircle(this.Position, Settings.ships.radius, color)
  }
}
