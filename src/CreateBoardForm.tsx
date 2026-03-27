import React, { /*useContext,*/ useState } from "react";
//import { PlainFormField } from './FormFields';
import { BingoBoard } from "./bingo/BingoBoard";
import type { BoardData, GoalData, TileData } from "../shared/types/bingo";
//import { AuthContext } from "./AuthContext"
//import expressApi from "./express-api";
//import { useNavigate } from "react-router";
import BoardTitleEditor from "./BoardTitleEditor";
import TileEditorModal from "./TileEditorModal";

const createEmptyGoal = (): GoalData => {
  return {
    id: crypto.randomUUID(),
    text: "",
    points: 0
  }
}

const createEmptyTile = (goalCount: number): TileData => {
  return {
    id: crypto.randomUUID(),
    title: "",
    goals: Array.from({ length: goalCount }, createEmptyGoal)
  }
}

const createInitialBoardTiles = (numberOfTiles: number, goalsPerTile: number): Array<TileData> => {
  return Array.from({ length: numberOfTiles }, () => createEmptyTile(goalsPerTile))
}

export const CreateBoardForm: React.FC<object> = () => {

  const [boardDraft, setBoardDraft] = useState<BoardData>(
    {
      title: "Untitled Board",
      tiles: createInitialBoardTiles(25, 3)
    }
  )
  const [activeTileIndex, setActiveTileIndex] = useState<number | null>(null)
  //const [showWrongFieldEntryMessage, setShowWrongFieldEntryMessage] = useState<boolean>(false)
  const activeTile = activeTileIndex !== null ? boardDraft.tiles[activeTileIndex] : null

  //const { currentClientUsername } = useContext(AuthContext)
  //const formInputStyles = 'p-1 bg-[#f5f5f5] inset-shadow-sm inset-shadow-gray-500 w-full focus:outline-1 focus:ring-0 focus:border-transparent'
  //const navigate = useNavigate()

  /*const handleTileClick = (index: number) => {
    setActiveTileIndex(index)
  }*/

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
        onAddTileClick={(index: number) => setActiveTileIndex(index)} 
      />
      {activeTile && (
        <TileEditorModal
          tile={activeTile}
          onClose={() => setActiveTileIndex(null)}
          onSave={(updatedTile: TileData) => {
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
