import type { BoardData, BoardSummary, IBoardSchema } from '../bingo'

export interface CreateBoardResponse {
  boardId: string;
}

export interface GetBoardResponse {
  board: IBoardSchema
}

export interface GetAllBoardsForUserResponse {
  allUserOwnedBoards: IBoardSchema[]
}

export interface GetAllBoardSummariesForUserResponse {
  boardSummaries: BoardSummary[]
}

export interface UpdateBoardRequest {
  boardId: string;
  updates: BoardData;
}