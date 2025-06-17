import type { BoardTileData } from "../../shared/types/bingo"
import { BoardTile } from "./BoardTile"

export const BingoBoard: React.FC<{allBoardTiles: Array<BoardTileData>}> = ({ allBoardTiles }) => {


  return ( 
    <div className="flex items-center justify-center p-2 bg-[#e8e8e8] shadow-inner rounded-md p-4">
      <div className="grid grid-cols-5 grid-rows-5 aspect-auto w-[90vmin] max-w-full max-h-full">

        {allBoardTiles.map((tile, index) => (
          <BoardTile key={index} tileHeader={tile.tileHeader} tileGoals={tile.tileGoals} />
        ))}

      </div>
    </div>
  )
}
