import { EventBoardSnapshot, EventTeamData, TeamTileProgress } from "../../shared/types/events"

export function createInitialTeamProgress(snapshot: EventBoardSnapshot, teams: EventTeamData[]): EventTeamData[] {
  for (const team of teams) {
    const initializedProgressTiles: TeamTileProgress[] = snapshot.boardTiles.map((tile) => ({
      tileId: tile.id,
      isComplete: false,
      goals: tile.goals.map((goal) => ({
        goalId: goal.id,
        isComplete: false,
        submissions: []
      }))
    }))

    team.progress.tiles = initializedProgressTiles
  }

  return teams
}