import type React from "react"
import type { BoardTileData } from "../../shared/types/bingo"

type BoardTileProps = {
  tile: BoardTileData;
  onTileClick?: () => void | undefined;
}

export  const BoardTile: React.FC<BoardTileProps> = ({ tile, onTileClick }) => {
  const emptyTile = tile.title.trim() === "" && tile.goals.every((g) => g.text.trim() ==="")
  
  return (
    <button 
      type="button"
      className="block h-full w-full overflow-hidden rounded-sm border cursor-pointer border-slate-100 bg-white text-left shadow-sm 
                 transition duration-150 hover:border-slate-400 hover:bg-slate-50 hover:shadow"
      onClick={onTileClick}
    >
      {emptyTile ? (
          <span
            className="flex h-full items-center justify-center text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            Add Tile
          </span> 
      ) :
        <div
          className="flex flex-col p-1"
        >
          <h3 className="mb-1.5 truncate text-left text-xs font-semibold text-slate-800">
            {tile.title}
          </h3> 
          <div className="min-h-0 flex flex-1 flex-col justify-start">
            {tile.goals.map((goal, index) => (
              <div key={goal.id ?? index} className="min-h-0">
                <div className="min-h-0 grid grid-cols-[1fr_auto] items-end">
                  <p className="min-w-0 truncate text-[11px] leading-tight text-slate-600 h-[14px]">
                    {goal.text}
                  </p>
                  <p className="text-[10px] leading-tight tracking-tight text-slate-500 whitespace-nowrap">
                    {goal.points}
                  </p>
                </div>
                {index < tile.goals.length - 1 && (
                  <div className="my-0.5 h-px w-full bg-gradient-to-r from-slate-300 via-slate-200 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      }
    </button>
  )
}
