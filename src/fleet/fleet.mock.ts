import { mockGridFactory } from "@/grid";
import { Team } from "@/team";
import { Fleet } from "./fleet";

export const mockFleetFactory = (team = Team.A, grid = mockGridFactory()): Fleet => new Fleet(team, grid)