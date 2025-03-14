import UsersTable from "@/components/UsersTable";
import { getWorkers } from "@/logic/hooks/workers/getWorkers";
import React from "react";

export default async function Home() {
  const workers = await getWorkers();

  console.log('Retreived workers:', workers);

  return (
      <div className="flex flex-col space-y-5">
      <UsersTable workers={workers}/>
      </div>
  );
}
