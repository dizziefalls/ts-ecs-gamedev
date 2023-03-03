import { CanvasLayer } from "@/canvas-layer"
import { Game } from "@/game/game"
import { mockGameFactory } from "@/game/game.mock"
import { Grid, mockGridFactory } from "@/grid"
import { OnClickComponent, Vector2D } from "@/utils"
import { GameInputComponent } from "./input"

class FakeGridOnClickComponent extends OnClickComponent {
  public Entity: Grid

  public Awake(): void {
    
  }

  public Update(deltaTime: number): void {
    
  }

  public ClickOn(point: Vector2D): void {
    
  }
}

describe('>>> Game Input Component', () => {
  let comp: GameInputComponent
  let grid: Grid
  let game: Game

  beforeEach(() => {
    grid = mockGridFactory()
    grid.AddComponent(new FakeGridOnClickComponent())

    game = mockGameFactory(grid)
    comp = new GameInputComponent()

    game.AddComponent(comp)
    game.Awake()
  })

  it('should handle click', () => {
    const point = new Vector2D(200, 200)
    const spy = jest.spyOn(grid.GetComponent(OnClickComponent), 'ClickOn')

    CanvasLayer.Background.CalcLocalPointFrom = jest.fn().mockReturnValueOnce(point)

    expect(spy).not.toBeCalled()

    document.body.dispatchEvent(new MouseEvent('click'))

    expect(spy).toBeCalledWith(point)
  })
})