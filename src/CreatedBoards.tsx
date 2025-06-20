import type React from "react";
import { useLoaderData } from "react-router";

export const CreatedBoards: React.FC = () => {
  const { records } = useLoaderData()
  console.log(records)

  return (
    <>

    </>
  )
}