import type { TileData } from "../../shared/types/bingo"
import { BoardTile } from "./BoardTile"

type BingoBoardProps = {
  allBoardTiles: Array<TileData>;
  onAddTileClick: (index: number) => void
}

export const BingoBoard: React.FC<BingoBoardProps> = ({ allBoardTiles, onAddTileClick }) => {

  return ( 
    <div className="w-full h-full min-h-0 flex items-center justify-center overflow-hidden bg-[#e8e8e8]">
      <div className="aspect-square h-full max-h-full max-w-full grid grid-cols-5 grid-rows-5">

        {allBoardTiles.map((tile, index) => (
          <BoardTile key={index} title={tile.title} goals={tile.goals} onAddTileClick={() => onAddTileClick(index)} />
        ))}

      </div>
    </div>
  )
}
