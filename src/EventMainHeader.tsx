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

  return (
    <div className="grid grid-flow-col gap-1 w-full">
      <h2>
        {eventRecord.title}
      </h2>
      <h2>
        STATUS: {eventRecord.status.toUpperCase()}
      </h2>
      <h2>
        {label}: {days}d {hours}h {minutes}m
      </h2>
      <DropDownTopNav items={eventAdminActions} />
    </div>
  )
}