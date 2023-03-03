import { Fleet } from "@/fleet";
import { Entity } from "@/utils";
import { ShipDrawComponent } from "./components";

export class Ship extends Entity {
  public Awake(): void {
    this.AddComponent(new ShipDrawComponent())

    super.Awake()
  }
  constructor(public readonly Factory: Fleet) {
    super()
  }
}