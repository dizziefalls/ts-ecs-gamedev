import { Vector2D } from "@/utils";
import { Node } from "./node";

export const mockNodeFactory = (
  start = new Vector2D(0, 0),
  end = new Vector2D(1, 1),
  index = new Vector2D(0, 0),
  neighbors: Node[] = []
): Node => new Node(start, end, index, neighbors)