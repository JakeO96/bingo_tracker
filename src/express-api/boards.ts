import { makeApiCall } from "./client"
import type { 
  CreateBoardResponse, 
  GetAllBoardsForUserResponse, 
  GetAllBoardSummariesForUserResponse, 
  GetBoardResponse, 
  UpdateBoardRequest } from '../../shared/types/express-api/boards'
import type { BoardData } from "../../shared/types/bingo"

// Create a new Bingo Board
const createBoard = async (data: BoardData ): Promise<CreateBoardResponse> =>
  makeApiCall<CreateBoardResponse>(
    'POST', 
    '/board/create-board', 
    "Failed to create board",
    data   
  )

const getBoard = async (id: string): Promise<GetBoardResponse> =>
makeApiCall<GetBoardResponse>(
  'GET',
  `/board/${id}`,
  "Failed to get board"
)

const getAllBoardsForUser = async (): Promise<GetAllBoardsForUserResponse> =>
  makeApiCall<GetAllBoardsForUserResponse>(
    'GET', 
    '/board/getAllBoardsForUser',
    "Failed to get user boards"  
  )

const getAllBoardSummariesForUser = async (): Promise<GetAllBoardSummariesForUserResponse> =>
  makeApiCall<GetAllBoardSummariesForUserResponse>(
    'GET',
    '/board/getAllBoardSummariesForUser',
    "Failed to get user board summaries"
  )

const updateBoard = async ({ boardId, updates  }: UpdateBoardRequest): Promise<void> =>
  makeApiCall<void>(
    'PATCH',
    `/board/${boardId}`,
    "Failed to update board",
    updates,
  )

export const boardsApi = {
  createBoard,
  getBoard,
  getAllBoardsForUser,
  getAllBoardSummariesForUser,
  updateBoard
}