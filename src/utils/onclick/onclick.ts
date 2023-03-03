import { Entity, IComponent } from "../ecs";
import { Vector2D } from "../vector2D";

export abstract class OnClickComponent implements IComponent {
  public abstract Entity: Entity | null

  public abstract Awake(): void 

  public abstract Update(deltaTime: number): void 

  public abstract ClickOn(point: Vector2D): void 
}