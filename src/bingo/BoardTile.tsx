import type React from "react"
import type { GoalData } from "../../shared/types/bingo"

type BoardTileProps = {
  title: string;
  goals: GoalData[];
  onAddTileClick: () => void;
}

export  const BoardTile: React.FC<BoardTileProps> = ({ title, goals, onAddTileClick }) => {

  const emptyTile = title.trim() === "" && goals.every((g) => g.text.trim() ==="")

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-sm border 
                    border-slate-100 bg-white shadow-sm transition duratoin-150 hover:border-slate-400 hover:shadow"
    >
      {emptyTile ? (
          <button
            onClick={onAddTileClick}
            className="flex h-full w-full items-center justify-center rounded-sm text-sm font-medium text-slate-500 
            transition duration-150 hover:bg-slate-50 hover:text-slate-700 hover:cursor-pointer sm:text-sm"
          >
            Add Tile
          </button> 
      ) :
        <div
          onClick={onAddTileClick}
          className="h-full w-full cursor-pointer flex flex-col p-1 hover:bg-slate-50"
        >
          <h3 className="mb-1.5 truncate text-left text-xs font-semibold text-slate-800">
            {title}
          </h3> 
          <div className="min-h-0 flex flex-1 flex-col justify-start">
            {goals.map((goal, index) => (
              <div key={goal.id ?? index}>
                <p className="truncate text-left text-[11px] leading-tight text-slate-600">
                  {goal.text}
                </p>

                {index < goals.length - 1 && (
                  <div className="my-0.5 h-px w-full bg-gradient-to-r from-slate-300 via-slate-200 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}

