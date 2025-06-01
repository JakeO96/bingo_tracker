import type React from "react"


export const BoardTile: React.FC<object> = () => {
  return (
    <div className={"w-square h-square flex items-center justify-center border border-black"}>
      <ul className="flex flex-col items-stretch justify-center w-full h-full">
        <TileGoalButton goalText={"Goal Tile 1"} />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
        <TileGoalButton goalText={"Goal Tile 2"} />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
        <TileGoalButton goalText={"Goal Tile 3"} />
      </ul>
    </div>
  )
}

const TileGoalButton: React.FC<{goalText: string}> = ({ goalText }) => {
  return (
    <button className="w-full px-6 py-2"> { goalText } </button>
  )
}