import { Settings } from "@/settings";
import { Entity } from "@/utils";

export class Game extends Entity {
  public Entities: Entity[] = []

  //Game writes a new Update method since its responsible for calculating the delta for all other entities
  private _lastTimestamp = 0

  public Awake(): void {
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

    this.DirtyDraw()
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

  private DirtyDraw(): void {
    //Create and attach a canvas to the DOM
    const canvas = document.createElement('canvas')
    const canvasSize = (Settings.grid.nodeSize + Settings.grid.nodeOffset) * Settings.grid.dimension + Settings.grid.nodeOffset 
    canvas.setAttribute('width', canvasSize.toString())
    canvas.setAttribute('height', canvasSize.toString())
    document.body.appendChild(canvas)

    
    const size = Settings.grid.nodeSize
    const offset = Settings.grid.nodeOffset
    for (let y = 0; y < Settings.grid.dimension; y++) {
      for (let x = 0; x < Settings.grid.dimension; x++) {
        const ctx = canvas.getContext('2d')! //! is the non-null operator
        ctx.beginPath()
        ctx.fillStyle = Settings.grid.color
        ctx.rect((size + offset) * x, (size + offset) * y, size, size)
        ctx.fill()
      }
    }
  }
}