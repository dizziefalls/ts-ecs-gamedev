import { Entity } from "@/utils";

export class Game extends Entity {
  //Game writes a new Update method since its responsible for calculating the delta for all other entities
  private _lastTimestamp = 0

  public Update(): void {
    const deltaTime = (Date.now() - this._lastTimestamp) / 1000

    //Now call the inherited Update method to update all subclasses
    super.Update(deltaTime)

    //Update timestamp
    this._lastTimestamp = Date.now()

    //Invoke this function recursively by frame
    window.requestAnimationFrame(() => this.Update())
  }
}