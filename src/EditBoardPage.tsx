import { useLoaderData, useNavigate } from "react-router";
import type { BoardData } from "../shared/types/bingo";
import BoardBuilder from "./BoardBuilder";
import expressApi from "./express-api";

export default function EditBoardPage() {
  const navigate = useNavigate()
  const { record } =useLoaderData()
  
  const boardId: string = String(record._id)
  const board: BoardData = {
    title: record.title,
    tiles: record.tiles
  }

  const handleUpdateBoard = async (updates: BoardData) => {
    try {
      console.log('api function passed to boardbuilder before api call firing, board id below and updates')
      console.log(boardId)
      console.log(updates)
      await expressApi.updateBoard(boardId, updates)
      console.log('api function passed to boardbuilder after api call firing')
      navigate(`/board/${boardId}`)
    } catch (error) {
      console.log('Error updating board', error)
    }
  }

  return (
    <BoardBuilder board={board} apiFunction={handleUpdateBoard} />
  );
}