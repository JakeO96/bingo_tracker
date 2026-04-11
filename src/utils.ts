import type { BoardTileData, GameBoardGoalData, GameBoardTileData } from "../shared/types/bingo"
import type { TeamTileProgress } from "../shared/types/events"

export function getEventTiming(startAt: string | Date, endAt: string | Date) {
  const start = new Date(startAt)
  const end = new Date(endAt)
  const now = Date.now()

  const hasStarted = now >= start.getTime()
  const hasEnded = now >= end.getTime()

  const target = hasStarted ? end.getTime() : start.getTime()
  const diff = target - now

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)

  return {
    hasStarted,
    hasEnded,
    days,
    hours,
    minutes
  }
}

export const createGameBoardTiles = (
    boardSnapshotTiles: BoardTileData[], 
    teamProgressTiles: TeamTileProgress[]
  ): GameBoardTileData[] => {
  //Map progress tiles by tileId for fast lookup
  const progressTileMap = new Map(
    teamProgressTiles.map((tile) => [tile.tileId, tile])
  )

  return boardSnapshotTiles.map((snapshotTile) => {
    const progressTile = progressTileMap.get(snapshotTile.id)

    if (!progressTile) {
      throw new Error("Progress data corrupted)")
    } else {
      const progressGoalMap = new Map(
        (progressTile?.goals ?? []).map((goal) => [goal.goalId, goal])
      )

      const gameBoardGoals: GameBoardGoalData[] = snapshotTile.goals.map((snapshotGoal) => {
        const progressGoal = progressGoalMap.get(snapshotGoal.id)
        
        if (!progressGoal) {
          throw new Error("Progress data corrupted")
        } else {
          return {
            id: snapshotGoal.id,
            text: snapshotGoal.text,
            points: snapshotGoal.points,
            isComplete: progressGoal?.isComplete ?? false,
            submissions: progressGoal?.submissions ?? []

          }
        }
      })

      //Derived UI helpers
      const completedGoalsCount = gameBoardGoals.filter((g) => g.isComplete).length;

      const hasPendingSubmissions = gameBoardGoals.some((g) => 
        g.submissions.some((s) => s.status === "pending")
      )

      return {
        id: snapshotTile.id,
        title: snapshotTile.title,
        isComplete: progressTile?.isComplete ?? false,
        goals: gameBoardGoals,
        completedGoalsCount: completedGoalsCount,
        hasPendingSubmissions: hasPendingSubmissions
      }
    }
  })
}
export const cn = (...classes: (string | false | null | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

