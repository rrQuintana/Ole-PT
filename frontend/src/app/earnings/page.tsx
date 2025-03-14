"use client";

import { useState, useEffect } from "react";
import EarningsTable from "./components/EarningsTable";
import getAllEarnings from "@/logic/hooks/earnings/getAllEarnings";
import { getWorkers } from "@/logic/hooks/workers/getWorkers";

export default function Home() {
  const [filters, setFilters] = useState({});
  const [earnings, setEarnings] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const earningsData = await getAllEarnings(filters);
        const workersData = await getWorkers();
        setEarnings(earningsData);
        setWorkers(workersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <div className="flex flex-col space-y-5">
      <EarningsTable earnings={earnings} workers={workers} setFilters={setFilters} />
    </div>
  );
}
