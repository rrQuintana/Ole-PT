"use client";

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNotification } from "./Notification";
import { Worker } from "@/logic/interfaces/worker.interface";
import { useRouter } from "next/navigation";
import addWithdrawal from "@/logic/hooks/withdrawals/addWithdrawal";

export default function WithdrawalModal({ worker, open, onClose }: { worker: Worker | null, open: boolean, onClose: () => void }) {
    const notificationContext = useNotification();
    const router = useRouter();
    const showNotification = notificationContext ? notificationContext.showNotification : () => { };

    console.log('worker: ', worker);
    
  const formik = useFormik({
    initialValues: {
      worker_id: worker?.id,
      amount: "",
      date: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number().positive("Earning must be positive").required("Earning total is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: async (values) => {
      try {
        await addWithdrawal({
          ...values,
          worker_id: Number(worker?.id),
          amount: Number(values.amount),
        });
        showNotification("Earning added successfully", "success");
        router.refresh();
        onClose();
      } catch (error) {
        console.error("Error adding earning:", error);
        showNotification("Error adding earning", "error");
      }
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Withdrawal</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            name="amount"
            type="number"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
          <TextField
            fullWidth
            label="Date"
            variant="outlined"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && formik.errors.date}
          />
          <DialogActions>
            <Button onClick={onClose} sx={{ color: "grey.500" }}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "#1E1E1E", color: "white", "&:hover": { bgcolor: "#333" } }}>Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}