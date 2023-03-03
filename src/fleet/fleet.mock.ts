import { Grid } from "@/grid";
import { Team } from "@/team";
import { Fleet } from "./fleet";

export const mockFleetFactory = (team = Team.A, grid = new Grid()): Fleet => new Fleet(team, grid)