import { useLoaderData } from "react-router"
import ListAllFetchedRecords from "./ListAllFetchedRecords"

export default function AllCreatedEventsPage() {
  const { records } = useLoaderData()

  return (
    <ListAllFetchedRecords recordSummaries={records} basePath="/event" />
  )
}