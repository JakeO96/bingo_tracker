import type { BoardTileData } from "../shared/types/bingo";
import Eventbuilder from "./EventBuilder";
import expressApi from "./express-api";
import { useLoaderData, useNavigate } from "react-router";

export type EventStatus = "draft" | "open" | "started" | "ended";

export type Participant = {
  id: string;
  eventId: string;
  displayName: string;
  rsn?: string;
  teamId?: string;
  userId?: string;
  createdAt: string;
}

type GoalSubmissionStatus = "pending" | "approved" | "rejected";

type GoalSubmission = {
  id: string;
  submittedByUserid: string;
  screenshotUrls: string[];
  submittedAt: string;
  status: GoalSubmissionStatus;
  reviewedByUserId?: string;
  reviewedAt?: string;
  reviewNote?: string;
}

type TeamGoalProgress = {
  goalId: string;
  isComplete: boolean;
  submissions: GoalSubmission[];
}

type TeamTileProgress = {
  tileId: string;
  isComplete: boolean;
  goals: TeamGoalProgress[]
}

type TeamProgress = {
  tiles: TeamTileProgress[]
}

export type EventTeamData = {
  id: string;
  name: string;
  members: Participant[];
  progress: TeamProgress;
}

export type EventSettings = {
  allowTeamSelection: boolean;
  maxTeamSize?: number;
  requireAdminApproval: boolean;
}

export type EventBoardSnapshot = {
  boardId: string;
  boardTitle: string;
  boardTiles: BoardTileData[];
}

export type EventData = {
  title: string;
  description: string;
  sourceBoardId: string;
  boardSnapshot?: EventBoardSnapshot;
  startDate: string;
  endDate: string;
  teams: EventTeamData[];
  settings: EventSettings;
  status: EventStatus;
}

export default function CreateEventPage() {
  const emptyEvent: EventData = {
    title: '',
    description: '',
    sourceBoardId: '',
    boardSnapshot: undefined,
    startDate: '',
    endDate: '',
    teams: [],
    settings: {
      allowTeamSelection: false,
      maxTeamSize: undefined,
      requireAdminApproval: true
    },
    status: 'draft'
  }
  const navigate = useNavigate()
  const { records } = useLoaderData()
  console.log('in CreateEventPage, boardSummaries from useLoaderData belowvvvv')
  console.log(records)

  const handleCreateEvent = async (draftEvent: EventData) => {
    try{
      await expressApi.createEvent(draftEvent)
      navigate('/event/:id')
    } catch(error) {
      console.error("Failed to create board", error)
    }
  }

  return (
    <Eventbuilder 
      event={emptyEvent} 
      apiFunction={handleCreateEvent} 
      availableBoards={records} 
      preSelectedBoard={null} 
    />
  )
}