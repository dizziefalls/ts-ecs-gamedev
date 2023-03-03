import { Grid, mockGridFactory } from "@/grid";
import { Node } from "@/node";
import { Settings } from "@/settings";
import { GridOnClickComponent } from "./components";

describe('>>> Grid', () => {
  const nodeCount = Settings.grid.dimension * Settings.grid.dimension
  let grid: Grid

  beforeEach(() => {
    grid = mockGridFactory()
  })

  it('should awake and update all components', () => {
    const spyDrawCompAwake = jest.spyOn(GridOnClickComponent.prototype, 'Awake')
    const spyUpdateCompAwake = jest.spyOn(GridOnClickComponent.prototype, 'Update')

    expect(spyDrawCompAwake).not.toBeCalled()
    expect(spyUpdateCompAwake).not.toBeCalled()

    grid.Awake()
    expect(spyDrawCompAwake).toBeCalled()

    grid.Update(0)
    expect(spyUpdateCompAwake).toBeCalled()
  })

  it('should awake and update all children', () => {
    const spyNodeAwake = jest.spyOn(Node.prototype, 'Awake')
    const spyNodeUpdate = jest.spyOn(Node.prototype, 'Update')

    expect(spyNodeAwake).not.toBeCalled()
    expect(spyNodeUpdate).not.toBeCalled()

    grid.Awake()
    expect(spyNodeAwake).toBeCalledTimes(nodeCount)

    grid.Update(0)
    expect(spyNodeUpdate).toBeCalledTimes(nodeCount)
  })
})