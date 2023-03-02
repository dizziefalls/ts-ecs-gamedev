import { Settings } from "@/settings";
import { Canvas, Vector2D } from "@/utils";

export class CanvasLayer {
  private static _background: Canvas

  private constructor() {}

  public static get Background(): Canvas {
    if (!this._background) {
      const size = (Settings.grid.nodeSize + Settings.grid.nodeOffset) * Settings.grid.dimension + Settings.grid.nodeOffset
      this._background = new Canvas(new Vector2D(size, size))
      this._background.Awake()
    }

    return this._background
  }
}