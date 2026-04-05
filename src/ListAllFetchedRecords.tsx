import { Link } from "react-router";

type ListRecordSummary = {
  id: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
}

type ListAllFetchedRecordsProps = {
  recordSummaries: ListRecordSummary[];
  basePath: string;
}


export default function ListAllFetchedRecords({ recordSummaries, basePath }: ListAllFetchedRecordsProps) {
  console.log(recordSummaries)

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          recordSummaries.map((summary: ListRecordSummary) => (
            <Link 
              key={summary.id}
              to={`${basePath}/${summary.id}`}
              className=""
            >  
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
                {summary.title}
              </div>
            </Link>
          ))
        }
      </div>
    </>
  )
}