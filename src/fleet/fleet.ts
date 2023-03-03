import { Settings } from "@/settings";
import { Ship } from "@/ship";
import { Team } from "@/team";
import { Entity } from "@/utils";

export class Fleet extends Entity {
  private _ships: Ship[] = []

  constructor(public readonly Team: Team) {
    super()
  }

  public Awake(): void {
    super.Awake()
    this.PrepareShips()
  }

  public Update(deltaTime: number): void {
    super.Update(deltaTime)
    this._ships.map(ship => ship.Update(deltaTime))
  }

  private PrepareShips(): void {
    const fleetsize = Settings.ships.fleetSize

    for (let i = 0; i < fleetsize; i++) {
      const ship = new Ship(this)
      this._ships.push(ship)
      ship.Awake()
    }
  }
}