import { Team } from "@/team";
import { Fleet } from "./fleet";

export const mockFleetFactory = (team = Team.A): Fleet => new Fleet(team)