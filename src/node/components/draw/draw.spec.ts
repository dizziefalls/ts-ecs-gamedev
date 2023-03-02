import { NodeDrawComponent } from "./draw"
import { CanvasLayer } from "@/canvas-layer"
import { mockNodeFactory } from "@/node/node.mock"

describe('>>> Node Draw Component', () => {
  let comp: NodeDrawComponent

  beforeEach(() => {
    comp = new NodeDrawComponent()
    comp.Entity = mockNodeFactory()
  })

  it('should clean up on wake', () => {
    const spy = jest.spyOn(CanvasLayer.Background, 'ClearRect')
    expect(spy).not.toBeCalled()

    comp.Awake()

    expect(spy).toBeCalled()
  })

  it('should clean up and draw rect every frame', () => {
    const spyClearRect = jest.spyOn(CanvasLayer.Background, 'ClearRect')
    const spyFillRect = jest.spyOn(CanvasLayer.Background, 'FillRect')

    expect(spyClearRect).not.toBeCalled()
    expect(spyFillRect).not.toBeCalled()

    comp.Update(0)

    expect(spyClearRect).toBeCalled()
    expect(spyFillRect).toBeCalled()
  })
})