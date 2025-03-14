"use client";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Typography, Button, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Worker } from "@/logic/interfaces/worker.interface";
import React, { useState } from "react";
import AddCardIcon from '@mui/icons-material/AddCard';
import { useRouter } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";
import deleteWorker from "@/logic/hooks/workers/deleteWorker";
import { useNotification } from "./Notification";
import EarningModal from "./EarningModal";
import WithdrawalModal from "./WithdrawalModal";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function UsersTable({ workers }: { workers: Worker[] }) {
  const router = useRouter();
  const notificationContext = useNotification();
  const showNotification = notificationContext ? notificationContext.showNotification : () => { };

  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [addEarningModalOpen, setAddEarningModalOpen] = useState(false);
  const [addWithdrawalModalOpen, setAddWithdrawalModalOpen] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>, workerId: number) => {
    setAnchorEl((prev) => ({ ...prev, [workerId]: event.currentTarget }));
    setSelectedWorker(workers.find((w) => w.id === workerId) || null);
  };

  const handleCloseMenu = (workerId: number | undefined) => {
    if (workerId !== undefined) {
      setAnchorEl((prev) => ({ ...prev, [workerId]: null }));
    }
  };

  const handleConfirm = async () => {
    if (!selectedWorker?.id) return;

    try {
      await deleteWorker(selectedWorker.id);
      showNotification("Worker deleted successfully", "success");
      router.refresh();
    } catch (error) {
      console.error("Error deleting worker:", error);
      showNotification("Error deleting worker", "error");
    } finally {
      setOpenModal(false);
      setSelectedWorker(null);
    }
  };

  return (
    <Box sx={{ bgcolor: "#0A0A0A", color: "white", p: 4, borderRadius: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "grey.300" }}>
          Manage workers
        </Typography>
        <Button
          onClick={() => router.push("/workers_form")}
          variant="contained"
          sx={{ bgcolor: "#1E1E1E", color: "white", textTransform: "none", "&:hover": { bgcolor: "#333" } }}
        >
          Add new worker
        </Button>
      </Box>

      <TableContainer sx={{ border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: 2, overflow: "hidden", backgroundColor: "#111" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1A1A1A" }}>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Worker</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Earnings</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Withdrawals</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Balance</TableCell>
              <TableCell sx={{ color: "grey.400", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((user) => (
              <TableRow key={user.id} sx={{ "&:hover": { bgcolor: "#222" }, transition: "background 0.2s ease-in-out" }}>
                <TableCell>
                  <div className="flex flex-row space-x-3 items-center">
                    <Avatar src={user.first_name} alt={user.first_name} sx={{ width: 32, height: 32 }} />
                    <Typography color="white">{user.first_name} {user.last_name}</Typography>
                  </div>
                </TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.earnings?.length}</TableCell>
                <TableCell>{user.withdrawals?.length}</TableCell>
                <TableCell sx={{ color: "green" }}>$ {user.available_balance}</TableCell>
                <TableCell>
                  <Tooltip title="Add balance">
                    <IconButton sx={{ color: "grey.500", "&:hover": { color: "white" }, mr: 3 }} onClick={() => {
                      setAddEarningModalOpen(true);
                      setSelectedWorker(user);
                    }}>
                      <AddCardIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Withdraw balance">
                    <IconButton sx={{ color: "grey.500", "&:hover": { color: "white" }, mr: 3 }} onClick={() => {
                      setAddWithdrawalModalOpen(true);
                      setSelectedWorker(user);
                    }}>
                      <MonetizationOnIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Options">
                    <IconButton sx={{ color: "grey.500", "&:hover": { color: "white" } }}
                      onClick={(e) => user.id && handleOpenMenu(e, user.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id={`menu-${user.id}`}
                    anchorEl={user.id !== undefined ? anchorEl[user.id] : null}
                    open={user.id !== undefined && Boolean(anchorEl[user.id])}
                    onClose={() => handleCloseMenu(user.id)}
                  >
                    <MenuItem onClick={() => {
                      setOpenModal(true);
                      setSelectedWorker(user);
                      handleCloseMenu(user.id);
                    }}>
                      Delete worker
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirm}
        text="¿Estás seguro de realizar esta acción?"
      />

      <EarningModal open={addEarningModalOpen} onClose={() => setAddEarningModalOpen(false)} worker={selectedWorker} />

      <WithdrawalModal open={addWithdrawalModalOpen} onClose={() => setAddWithdrawalModalOpen(false)} worker={selectedWorker} />
    </Box>
  );
}
