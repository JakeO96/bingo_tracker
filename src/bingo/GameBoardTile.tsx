import type React from "react"
import type { GameBoardTileData } from "../../shared/types/bingo";
import { cn } from "../utils";

type GameBoardTileProps = {
  tile: GameBoardTileData;
  onTileClick?: () => void | undefined;
}

export  const GameBoardTile: React.FC<GameBoardTileProps> = ({ tile, onTileClick }) => {
  
  return (
    <button 
      type="button"
      className="block h-full w-full overflow-hidden rounded-sm border cursor-pointer border-slate-100 bg-white text-left shadow-sm 
                 transition duration-150 hover:border-slate-400 hover:bg-slate-50 hover:shadow"
      onClick={onTileClick}
    >
      <div
        className={cn(
          "flex flex-col p-1",
          tile.isComplete && "bg-emerald-200"
        )}
      >
        <h3 className="mb-1.5 truncate text-left text-xs font-semibold text-slate-800">
          {tile.title}
        </h3> 
        <div className="min-h-0 flex flex-1 flex-col justify-start">
          {tile.goals.map((goal, index) => (
            <div key={goal.id ?? index} className="min-h-0">
              <div className="min-h-0 grid grid-cols-[1fr_auto] items-end">
                <p className={cn(
                    "min-w-0 truncate text-[11px] leading-tight text-slate-600 h-[14px] bg-gray-200",
                    goal.isComplete && "bg-emerald-200"
                  )}
                >
                  {goal.text}
                </p>
                <p className="text-[10px] leading-tight tracking-tight text-slate-500 whitespace-nowrap">
                  {goal.points}
                </p>
              </div>
              {index < tile.goals.length - 1 && (
                <div className="my-0.5 h-px w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </button>
  )
}