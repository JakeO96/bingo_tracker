import type React from "react"


export const BoardTile: React.FC<object> = () => {
  return (
      <div className="flex flex-col items-center justify-center aspect-square p-[1vw] text-[1.2vw] max-w-full max-h-full overflow-hidden">
        <h1 className="text-[1.1vw] font-semibold mb-1">Tile Title</h1>
        <ul className="flex flex-col items-stretch justify-center w-full space-y-[0.3vw]">
          <TileGoalButton goalText={"Goal Tile 1"} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
          <TileGoalButton goalText={"Goal Tile 2"} />
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
          <TileGoalButton goalText={"Goal Tile 3"} />
        </ul>
      </div>
  )
}

const TileGoalButton: React.FC<{ goalText: string }> = ({ goalText }) => {
  return (
    <button className="text-[.9vw] w-full px-[0.5vw] cursor-pointer border-x border-slate-400 hover:border-transparent transition-colors duration-300 bg-gradient-to-r from-transparent via-[rgba(255,0,0,0.5)] to-transparent hover:via-[rgba(0,0,255,0.1)] 
  transition-colors duration-300 transition-colors">
      { goalText } 
    </button>
  )
}