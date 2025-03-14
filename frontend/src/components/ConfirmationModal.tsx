"use client";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export default function ConfirmationModal({ open, onClose, onConfirm, text }: { open: boolean, onClose: () => void, onConfirm: () => void, text: string }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "grey.500" }}>Cancelar</Button>
        <Button onClick={onConfirm} sx={{ bgcolor: "#1E1E1E", color: "white", "&:hover": { bgcolor: "#333" } }}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
