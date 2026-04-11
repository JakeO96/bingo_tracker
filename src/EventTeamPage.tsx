import { useLoaderData } from "react-router";
import EventMainHeader from "./EventMainHeader";
import { createGameBoardTiles } from "./utils";
import { BingoBoard } from "./bingo/BingoBoard";
import { useMemo, useState } from "react";
import type { GameBoardTileData } from "../shared/types/bingo";
import TileGameModal from "./TileGameModal";

export default function EventTeamPage() {
  const { teamPageEventData } = useLoaderData()
  const { team } = teamPageEventData
  const gameBoardTiles: GameBoardTileData[] = useMemo(() => {
    return createGameBoardTiles(teamPageEventData.boardSnapshot.boardTiles, team.progress.tiles)
  }, [teamPageEventData.boardSnapshot.boardTiles, team.progress.tiles])
  const [activeTileIndex, setActiveTileIndex] = useState<number | null>(null)
  const activeTile = activeTileIndex !== null ? gameBoardTiles[activeTileIndex] : null

  return (
    <div className="flex h-full min-h-0 flex-col items-center overflow-hidden">
      <EventMainHeader eventRecord={teamPageEventData} />

      <div>{team.name}</div>
      <BingoBoard 
        allBoardTiles={gameBoardTiles} 
        onTileClick={(index: number) => setActiveTileIndex(index)} 
        mode={"game"} 
      />
      {activeTile && (
      <TileGameModal
        tile={activeTile}
        onClose={() => setActiveTileIndex(null)}
      />
    )}  
      
    </div>
  )
}