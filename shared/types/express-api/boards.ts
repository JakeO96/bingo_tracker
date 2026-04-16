import type { BoardData, BoardSummary, BoardTileData, IBoardSchema } from '../bingo'

export interface CreateBoardRequest {
  title: string;
  tiles: BoardTileData[]
}
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

export interface UpdateBoardResponse {
  message: string;
}
export interface UpdateBoardRequest {
  id: string;
  updateData: BoardData;
}