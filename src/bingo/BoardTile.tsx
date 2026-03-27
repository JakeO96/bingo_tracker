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
    <>
    {emptyTile ? (
      <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden p-1">
        <div className="flex justify-center items-center">
          <button
            onClick={onAddTileClick}
            className="hover:cursor-pointer text-xs sm:text-sm"
          >
            Add Tile
          </button> 
        </div>
      </div>
    ) :
      <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden p-1">
        <div className="flex justify-center ">
          <h1 className="mb-1 text-center text-xs font-semibold leading-tight">{title}</h1> 
        </div>
        <ul className="flex w-full flex-col items-stretch justify-center gap-[1px]">
          <TileGoalButton goalText={goals[0].text} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
          <TileGoalButton goalText={goals[1].text} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
          <TileGoalButton goalText={goals[2].text} />
        </ul>
      </div>
    }
    </>
  )
}

const TileGoalButton: React.FC<{ goalText: string }> = ({ goalText }) => {
  return (
    <button className="w-full px-1 text-[10px] leading-tight cursor-pointer hover:border-transparent 
    transition-colors duration-300 bg-gradient-to-r from-transparent via-[rgba(255,0,0,0.5)] 
    to-transparent hover:via-[rgba(0,0,255,0.1)] transition-colors duration-300 transition-colors">
      { goalText } 
    </button>
  )
}

