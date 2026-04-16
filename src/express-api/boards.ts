import { makeApiCall } from "./client"
import type { CreateBoardRequest, CreateBoardResponse, GetAllBoardsForUserResponse, GetAllBoardSummariesForUserResponse, GetBoardResponse, UpdateBoardRequest, UpdateBoardResponse} from '../../shared/types/api/boards'

// Create a new Bingo Board
const createBoard = async (data: CreateBoardRequest ): Promise<CreateBoardResponse> =>
  makeApiCall<CreateBoardResponse>(
    'POST', 
    '/board/create-board', 
    data,
    "Failed to create board"    
  )

const getBoard = async (id: string): Promise<GetBoardResponse> =>
makeApiCall<GetBoardResponse>(
  'GET',
  `/board/${id}`,
  {},
  "Failed to get board"
)

const getAllBoardsForUser = async (): Promise<GetAllBoardsForUserResponse> =>
  makeApiCall<GetAllBoardsForUserResponse>(
    'GET', 
    '/board/getAllBoardsForUser',
    {},
    "Failed to get user boards"  
  )

const getAllBoardSummariesForUser = async (): Promise<GetAllBoardSummariesForUserResponse> =>
  makeApiCall<GetAllBoardSummariesForUserResponse>(
    'GET',
    '/board/getAllBoardSummariesForUser',
    {},
    "Failed to get user board summaries"
  )

const updateBoard = async ({ id, updateData  }: UpdateBoardRequest): Promise<UpdateBoardResponse> =>
  makeApiCall<UpdateBoardResponse>(
    'PATCH',
    `/board/${id}`,
    { updateData },
    "Failed to update board"
  )

export const boardsApi = {
  createBoard,
  getBoard,
  getAllBoardsForUser,
  getAllBoardSummariesForUser,
  updateBoard
}