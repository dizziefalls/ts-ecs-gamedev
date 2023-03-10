import { Fleet } from "@/fleet";
import { Grid } from "@/grid";
import { Team } from "@/team";
import { Entity } from "@/utils";
import { GameInputComponent } from "./components";

export class Game extends Entity {
  //Game writes a new Update method since its responsible for calculating the delta for all other entities
  private _lastTimestamp = 0

  private _entities: Entity[] = []

  public get Entities(): Entity[] {
    return this._entities
  }

  constructor(grid: Grid, fleetA: Fleet, fleetB: Fleet) {
    super()

    this._entities.push(grid, fleetA, fleetB)
  }

  public Awake(): void {
    //Attach components before waking
    this.AddComponent(new GameInputComponent())

    //Awakens all Entity subclasses
    super.Awake()

    //awake all children
    for (const entity of this.Entities) {
      entity.Awake()
    }

    //Only start loop after all entities are awakened
    window.requestAnimationFrame(() => {
      //inital timestamp
      this._lastTimestamp = Date.now()

      //inits game loop
      this.Update()
    })
  }

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000

    //Now call the inherited Update method to update all subclasses
    super.Update(deltaTime)

    //Update all children
    for (const entity of this.Entities) {
      entity.Update(deltaTime)
    }

    //Update timestamp
    this._lastTimestamp = Date.now()

    //Invoke this function recursively by frame
    window.requestAnimationFrame(() => this.Update())
  }
}