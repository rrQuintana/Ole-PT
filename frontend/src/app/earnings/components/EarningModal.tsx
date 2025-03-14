"use client";

import addEarning from "@/logic/hooks/earnings/addEarning";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Autocomplete } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/Notification";
import { Worker } from "@/logic/interfaces/worker.interface";

export default function EarningModal({ workers, open, onClose }: { workers: Worker[], open: boolean, onClose: () => void }) {
    const notificationContext = useNotification();
    const router = useRouter();
    const showNotification = notificationContext ? notificationContext.showNotification : () => { };
    
  console.log('workers: ', workers);

  const formik = useFormik({
    initialValues: {
      worker_id: "",
      earning_total: "",
      date: "",
    },
    validationSchema: Yup.object({
      worker_id: Yup.string().required("Worker is required"),
      earning_total: Yup.number().positive("Earning must be positive").required("Earning total is required"),
      date: Yup.date().required("Date is required"),
    }),
    onSubmit: async (values) => {
      try {
        await addEarning({
          ...values,
          worker_id: Number(values.worker_id),
          earning_total: Number(values.earning_total),
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
      <DialogTitle>Add Earning</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
          <Autocomplete
            options={workers}
            getOptionLabel={(option) => option.first_name + " " + option.last_name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Worker"
                variant="outlined"
                error={formik.touched.worker_id && Boolean(formik.errors.worker_id)}
                helperText={formik.touched.worker_id && formik.errors.worker_id}
              />
            )}
            onChange={(event, value) => {
              formik.setFieldValue("worker_id", value?.id);
            }}
          />
          <TextField
            fullWidth
            label="Earning Total"
            variant="outlined"
            name="earning_total"
            type="number"
            value={formik.values.earning_total}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.earning_total && Boolean(formik.errors.earning_total)}
            helperText={formik.touched.earning_total && formik.errors.earning_total}
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