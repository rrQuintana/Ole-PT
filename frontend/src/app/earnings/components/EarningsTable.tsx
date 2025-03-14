/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Earning } from "@/logic/interfaces/earning.interface";
import { Worker } from "@/logic/interfaces/worker.interface";
import EarningModal from "./EarningModal";
import { useState } from "react";
import CustomizedMenus from "./Filters";

export default function EarningsTable({ workers, earnings, setFilters }: { workers: Worker[]; earnings: Earning[]; setFilters: (filters: any) => void }) {
  const [addEarningModalOpen, setAddEarningModalOpen] = useState(false);

  return (
    <Box sx={{ bgcolor: "#0A0A0A", color: "white", p: 4, borderRadius: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "grey.300" }}>
          Manage Earnings
        </Typography>
        <div className="flex flex-row space-x-3">
          <CustomizedMenus workers={workers} setFilters={setFilters} />
          <Button
            onClick={() => setAddEarningModalOpen(true)}
            variant="contained" sx={{ bgcolor: "#1E1E1E", color: "white", textTransform: "none", "&:hover": { bgcolor: "#333" } }}
          >
            Add new
          </Button>
        </div>

      </Box>

      <TableContainer sx={{ border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: 2, overflow: "hidden", backgroundColor: "#111" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1A1A1A" }}>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Worker ID</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Worker Name</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Total Earning</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {earnings?.map((earning) => (
              <TableRow key={earning.id} sx={{ "&:hover": { bgcolor: "#222" }, transition: "background 0.2s ease-in-out" }}>
                <TableCell sx={{ color: "grey.400" }}>{earning.worker?.id}</TableCell>
                <TableCell sx={{ color: "grey.400" }}>{earning.worker?.first_name} {earning.worker?.last_name}</TableCell>
                <TableCell sx={{ color: "green" }}>$ {earning.earning_total.toFixed(2)}</TableCell>
                <TableCell sx={{ color: "grey.400" }}>{earning.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <EarningModal
        open={addEarningModalOpen}
        onClose={() => {
          setAddEarningModalOpen(false);
        }}
        workers={workers}
      />
    </Box>
  );
}
