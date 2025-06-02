/* eslint-disable prefer-const */
import { BoardTile } from "./BoardTile"

export const BingoBoard: React.FC<object> = () => {

  return ( 
    <div className="w-screen h-screen flex items-center justify-center bg-slate-100 p-2">
      <div className="grid grid-cols-5 grid-rows-5 aspect-square w-[90vmin] max-w-full max-h-full">
        {Array.from({ length: 25 }).map((_, i) => (
          <BoardTile key={i} />
        ))} 
      </div>
    </div>
  )
}