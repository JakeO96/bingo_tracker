import type React from "react";
import { useLoaderData } from "react-router";
import { BingoBoard } from "./bingo/BingoBoard";
import type { IBoardSchema } from "../shared/types/bingo";

export const CreatedBoards: React.FC = () => {
  const { records } = useLoaderData()
  //console.log('records=====' + JSON.stringify(records))
  const boardsArray = records.records
  //console.log('boardsArray======' + JSON.stringify(boardsArray))

  return (
    <>
      {
        boardsArray.map((boardRecord: IBoardSchema, index: number) => (
          <BingoBoard 
            key={boardRecord.boardId?.toString() ?? index} 
            allBoardTiles={boardRecord.board} 
          />
        ))
      }
    </>
  )
}