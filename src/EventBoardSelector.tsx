import type { ListRecordSummary } from './ListAllFetchedRecords'

type EventBoardSelectorProps = {
  boards: ListRecordSummary[];
  value: string;
  onChange: (boardId: string) => void;
  disabled?: boolean;
  isLoadingBoard?: boolean;
  error?: string | null;

}

export default function EventBoardSelector({
  boards,
  value,
  onChange,
  disabled = false,
  isLoadingBoard = false,
  error=null
}: EventBoardSelectorProps) {
  const formInputStyles = "h-11 p-1 bg-white border border-gray-400 w-full focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-300"


  return(
    <div className="flex flex-col gap-2">
      <label
        htmlFor="board-selector"
        className="test-sm font-medium"
      >
        Select Board
      </label>
      <select
        id="board-selector"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={formInputStyles}
      >
        <option value="">Choose a board</option>

        {boards.map((board) => (
          <option key={board.id} value={board.id}>
            {board.title}
          </option>
        ))}
      </select>

      {isLoadingBoard && (
        <p className="text-sm text-slate-400">Loading selected board...</p>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}