import React, { useState } from "react";
import { BingoBoard } from "./bingo/BingoBoard";
import type { BoardData, BoardTileData } from "../shared/types/bingo";
import BoardTitleEditor from "./BoardTitleEditor";
import TileEditorModal from "./TileEditorModal";

type BoardBuilderProps = {
  board: BoardData;
  apiFunction: (board: BoardData) => void;
}

export default function BoardBuilder({ board, apiFunction }: BoardBuilderProps) {

  const [boardDraft, setBoardDraft] = useState<BoardData>(board)
  const [activeTileIndex, setActiveTileIndex] = useState<number | null>(null)
  const activeTile = activeTileIndex !== null ? boardDraft.tiles[activeTileIndex] : null

  const onSaveBoardClick = async (evt: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    evt.preventDefault()
    console.log('inside board builder, before api call onSaveBoardClick and board below')
    console.log(boardDraft)
    apiFunction(boardDraft)
  }

  return (
    <div className="flex h-full min-h-0 flex-col items-center overflow-hidden">
      <div className='grid grid-cols-[1fr_auto_1fr] items-end w-full'>
        <div />
        <BoardTitleEditor 
          title={boardDraft.title}
          onSave={(nextTitle) => setBoardDraft((prev) => ({...prev, title: nextTitle }))
          }
        />
        <div className="flex justify-end w-full gap-2">
          <button
            type="button"
            className='inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border 
                border-gray-600 bg-white px-6 text-sm font-semibold text-black transition duration-200 hover:cursor-pointer 
                hover:bg-red-400 hover:text-white hover:border-red-400 
                focus:outline-none focus:ring-2 focus:ring-red-200 active:scale-[0.98]'
          >
            Cancel
          </button>
          <button 
            type='button'
            onClick={onSaveBoardClick}
            className="w-1/3 inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-emerald-500 
            px-6 text-sm font-semibold text-white transition duration-200 hover:cursor-pointer 
            hover:brightness-120 focus:outline-none focus:ring-2 focus:ring-emerald-200 active:scale-[0.98]"
          >
            Save Board
          </button>
        </div>
      </div>
      <BingoBoard 
        allBoardTiles={boardDraft.tiles} 
        onTileClick={(index: number) => setActiveTileIndex(index)} 
        mode={"edit"}
      />
      {activeTile && (
        <TileEditorModal
          tile={activeTile}
          onClose={() => setActiveTileIndex(null)}
          onSave={(updatedTile: BoardTileData) => {
            setBoardDraft((prev) => ({
              ...prev,
              tiles: prev.tiles.map((tile, index) =>
                index === activeTileIndex ? updatedTile : tile
            ),
          }))
          setActiveTileIndex(null)
        }}
        />
      )}    
    </div>
  )
}
