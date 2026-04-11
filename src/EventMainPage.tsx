import { NavLink, useLoaderData } from "react-router";
import { DropDownTopNav } from "./NavBars";
import { mainEventLinks } from "./NavBarLinks";
import type { EventTeamData } from "../shared/types/events";
import EventMainHeader from "./EventMainHeader";


export default function EventMainPage() {
  const { eventData } = useLoaderData()

  return (
    <div className="flex flex-col">
      <EventMainHeader eventRecord={eventData} />
      <DropDownTopNav items={mainEventLinks} />
      <div className="flex justify-center items-center w-full h-full">
        <div className="border mx-70 flex flex-1 flex-col items-left justify-center">
          {eventData.teams.map(( team: EventTeamData ) => (
            <NavLink key={team.id} to={`team/${team.id}`}>
              {team.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}