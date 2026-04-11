import type { BoardTileData, GameBoardTileData } from "../../shared/types/bingo"
import { BoardTile } from "./BoardTile"
import { GameBoardTile } from "./GameBoardTile"

type EditBingoBoardProps = {
  mode: "edit"
  allBoardTiles: BoardTileData[];
  onTileClick?: (index: number) => void | undefined;
}

type GameBingoBoardProps = {
  mode: "game";
  allBoardTiles: GameBoardTileData[];
  onTileClick?: (index: number) => void | undefined;
}

type BingoBoardProps = EditBingoBoardProps | GameBingoBoardProps

export const BingoBoard: React.FC<BingoBoardProps> = ({ allBoardTiles, onTileClick, mode }: BingoBoardProps) => {
  if (mode === 'edit') {
    return (
      <div className="overflow-hidden aspect-square h-full w-ful max-h-full max-w-full grid grid-cols-5 grid-rows-5 gap-0.5 rounded-sm
                      border border-slate-200 bg-slate-100 p-0.5 shadow-lg hover:shadow-sm">
        {allBoardTiles.map((tile, index) => (
          <BoardTile 
            key={index} 
            tile={tile} 
            onTileClick={onTileClick ? () => onTileClick(index) : undefined} 
          />
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-hidden aspect-square h-full w-ful max-h-full max-w-full grid grid-cols-5 grid-rows-5 gap-0.5 rounded-sm
                    border border-slate-200 bg-slate-100 p-0.5 shadow-lg hover:shadow-sm">
      {allBoardTiles.map((tile, index) => (
        <GameBoardTile
          key={index} 
          tile={tile} 
          onTileClick={onTileClick ? () => onTileClick(index) : undefined} 
        />
      ))}
    </div>
  )
}
