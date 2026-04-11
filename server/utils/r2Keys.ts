type BuildGoalScreenshotKeyArgs = {
  eventId: string;
  teamId: string;
  tileId: string;
  goalId: string;
  participantId: string;
  extension: string;
}

export function buildGoalScreenshotKey({
  eventId,
  teamId,
  tileId,
  goalId,
  participantId,
  extension
}: BuildGoalScreenshotKeyArgs): string {
  const timestamp = Date.now()
  const safeExt = extension.replace(/[^a-z0-9]/gi, "").toLocaleLowerCase() || "jpg"

  return [
    "events",
    eventId,
    "teams",
    teamId,
    "tiles",
    tileId,
    "goals",
    goalId,
    `user-${participantId}-${timestamp}.${safeExt}`
  ].join("/")
}