import type { EventTeamData } from "../shared/types/events"
import { PlainFormField } from "./FormFields";

type EventTeamEditorProps = {
  teams: EventTeamData[];
  onChangeTeams: (updatedTeams: EventTeamData[]) => void;
}

export default function EventTeamsEditor({ teams, onChangeTeams }: EventTeamEditorProps) {
  const handleTeamNameChange = (teamId: string, newName: string) => {
    onChangeTeams(
      teams.map((team) => 
        team.id === teamId ? { ...team, name: newName } : team
      )
    )
  }

  const handleAddTeam = () => {
    onChangeTeams([
      ...teams,
      {
        id: crypto.randomUUID(),
        name: "",
        members: [],
        progress: {
          totalPoints: 0,
          completedGoalsCount: 0,
          completedTilesCount: 0,
          tiles: []
        }
      }
    ])
  }
  
  const handleRemoveTeam = (teamId: string) => {
    if (teams.length <= 2) return

    onChangeTeams(teams.filter((team) => team.id !== teamId))
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-slate-300 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Teams</h2>
        <button 
          type="button"
          onClick={handleAddTeam}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:cursor-pointer"
        >
          + Add Team
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {teams.map((team, index) => (
          <div key={team.id} className="flex items-center gap-2">
            <PlainFormField
              name={`teamName-${index}`}
              type="text"
              value={team.name}
              onChange={({ value }) => handleTeamNameChange(team.id, value)}
              placeholder={`Team ${index + 1}`}
            />

            {teams.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveTeam(team.id)}
                className="shrink-0 rounded-md border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:cursor-pointer"
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}