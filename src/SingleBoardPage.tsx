import { Link, useLoaderData } from "react-router";
import { BingoBoard } from "./bingo/BingoBoard";

export default function SingleBoardPage() {
  const { record } = useLoaderData()

  return (
    <div className="flex h-full w-full">
      <div className="flex flex-col items-center justify-center">
        {record.title}
        <BingoBoard allBoardTiles={record.tiles} />
      </div>
      <div>
        <Link 
          to={`/board/${record._id}/edit`}
        >
          Edit Board
        </Link>
      </div>
    </div>
  )
}