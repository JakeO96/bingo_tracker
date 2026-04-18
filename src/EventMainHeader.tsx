import type { IEventSchema } from "../shared/types/events"
import { eventAdminActions } from "./NavBarLinks";
import { DropDownTopNav } from "./NavBars";
import { getEventTiming } from "./utils";

type EventMainHeaderProps = {
  eventRecord: IEventSchema;
}

export default function EventMainHeader({ eventRecord }: EventMainHeaderProps) {
  const {
    hasStarted,
    hasEnded,
    days,
    hours,
    minutes
  } = getEventTiming (eventRecord.startAt, eventRecord.endAt)

  const label = hasEnded 
    ? "Event Ended" 
    : hasStarted 
      ? "Time Left" 
      : "Starts In"

  const joinLink = `localhost:5173/join/${eventRecord.inviteData.generalJoinToken}`

  return (
    <div className="grid grid-flow-col gap-1 w-full items-center">
      <h2>
        {eventRecord.title}
      </h2>
      <h2>
        STATUS: {eventRecord.status.toUpperCase()}
      </h2>
      <h2>
        {label}: {days}d {hours}h {minutes}m
      </h2>
      <div className="bg-gray-100 border rounded px-2 py-1 flex items-center w-fit max-w-full">
        <span className="mr-1 text-sm text-emerald-700 shrink-0">Invite Link:</span>
        <span className="text-sm text-gray-600 truncate max-w-[20vw]">
          {joinLink}
        </span>
        <button 
          className="ml-1 text-sm font-medium cursor-pointer shrink-0"
          onClick={() => navigator.clipboard.writeText(joinLink)}
        >
          Copy
        </button>
      </div>
      <DropDownTopNav items={eventAdminActions} />
    </div>
  )
}