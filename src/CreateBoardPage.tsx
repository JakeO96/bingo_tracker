import { useNavigate } from "react-router";
import type { BoardData, BoardGoalData, BoardTileData } from "../shared/types/bingo";
import  BoardBuilder from "./BoardBuilder";
import { expressApi } from "./express-api";

const createEmptyGoal = (): BoardGoalData => {
  return {
    id: crypto.randomUUID(),
    text: "",
    points: 0
  }
}

const createEmptyTile = (goalCount: number): BoardTileData => {
  return {
    id: crypto.randomUUID(),
    title: "",
    goals: Array.from({ length: goalCount }, createEmptyGoal)
  }
}

const initializeEmptyBoardState = (numberOfTiles: number, goalsPerTile: number): Array<BoardTileData> => {
  return Array.from({ length: numberOfTiles }, () => createEmptyTile(goalsPerTile))
}

export default function CreateBoardPage() {
  const navigate = useNavigate()
  const emptyBoard = {
    title: "Untitled Board",
    tiles: initializeEmptyBoardState(25, 3)
  }
  
  const handleCreateBoard = async (boardDraft: BoardData) => {
    try {
      await expressApi.boards.createBoard({ 
        title: boardDraft.title,
        tiles: boardDraft.tiles, 
      })

      navigate("/boards-created")
    } catch (error) {
      console.error("Error creating board", error)
    }
  }

  return (
    <BoardBuilder board={emptyBoard} apiFunction={handleCreateBoard}/>
  );
}