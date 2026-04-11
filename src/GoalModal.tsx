import type { GameBoardGoalData } from "../shared/types/bingo"

type GoalModalProps = {
  goal: GameBoardGoalData;
}

export default function GoalModal({ goal }: GoalModalProps) {

  return (
    <div>
      <div className='min-h-0 grid grid-cols-[1fr_auto] items-end'>
        <span>Submissions</span>
        <input type="file" accept="image/*" />
      </div>
      {goal.submissions.map((submission) => (
        <div>
          {submission.screenshotUrls.map((url) => (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {url}
            </a>
          ))}
        </div>
      ))}
    </div>
  )

}