import type { TileData } from "../../shared/types/bingo"
import { BoardTile } from "./BoardTile"

type BingoBoardProps = {
  allBoardTiles: Array<TileData>;
  onAddTileClick: (index: number) => void
}

export const BingoBoard: React.FC<BingoBoardProps> = ({ allBoardTiles, onAddTileClick }) => {

  return ( 
      <div className="aspect-square h-full max-h-full max-w-full grid grid-cols-5 grid-rows-5 gap-1.5 rounded-sm
      border border-slate-200 bg-slate-100 p-1.5 shadow-lg">

        {allBoardTiles.map((tile, index) => (
          <BoardTile key={index} title={tile.title} goals={tile.goals} onAddTileClick={() => onAddTileClick(index)} />
        ))}

      </div>
  )
}
