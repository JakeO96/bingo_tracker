/* eslint-disable prefer-const */
import { BoardTile } from "./BoardTile"

export const BingoBoard: React.FC<object> = () => {

  let bingoBoard = []

  for (let row_num = 0; row_num < 5; row_num++) {
    let row = []
    for (let col_num = 0; col_num < 5; col_num++) {
      row.push(<BoardTile key={`${row_num}-${col_num}`} />)
    }
    bingoBoard.push(<div key={row_num} className="flex items-center"> {row} </div>)
  }

  return ( 
    <div>
      { bingoBoard }
    </div>
  )
}