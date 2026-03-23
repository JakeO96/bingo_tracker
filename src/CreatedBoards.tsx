import type React from "react";
import { Link, useLoaderData } from "react-router";
import type { IBoardSchema } from "../shared/types/bingo";

export const CreatedBoards: React.FC = () => {
  const { records } = useLoaderData()
  const boardsArray = records.records
  console.log(boardsArray)

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          boardsArray.map((boardRecord: IBoardSchema) => (
            <Link 
              key={crypto.randomUUID()}
              to={`/boards/${boardRecord.boardId}`}
              className=""
            >  
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                {boardRecord.title}
              </div>
            </Link>
          ))
        }
      </div>
    </>
  )
}