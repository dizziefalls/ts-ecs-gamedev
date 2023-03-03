import { Grid } from "@/grid";
import { Settings } from "@/settings";
import { Ship } from "@/ship";
import { Team } from "@/team";
import { Entity } from "@/utils";

export class Fleet extends Entity {
  private _ships: Ship[] = []

  constructor(
    public readonly Team: Team,
    private readonly _grid: Grid  
  ) {
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
    const dimension = Settings.grid.dimension
    const fleetsize = Settings.ships.fleetSize
    const nodes = this._grid.Nodes

    for (let i = 0; i < fleetsize; i++) {
      const node = this.Team == Team.A ? nodes[i * dimension] : nodes[nodes.length - 1 - i * dimension]
      const ship = new Ship(this, node)
      this._ships.push(ship)
      ship.Awake()
    }

    // @todo start with state machine. boy i hope he wrote that part...
    if (this.Team === Team.A) {
      this._ships[0].IsActive = true
    }
  }
}