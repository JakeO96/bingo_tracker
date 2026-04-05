import { useLoaderData } from "react-router"
import ListAllFetchedRecords from "./ListAllFetchedRecords"


export default function AllCreatedBoardsPage() {
  const { records } = useLoaderData()

  return (
    <ListAllFetchedRecords recordSummaries={records} basePath="/board" />
  )
}