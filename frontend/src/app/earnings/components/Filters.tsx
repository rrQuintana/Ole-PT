/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Box, Button, TextField, Menu, Autocomplete } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useFormik } from "formik";
import { Worker } from "@/logic/interfaces/worker.interface";

export default function FilterForm({ workers, setFilters }: { workers: Worker[]; setFilters: (filters: any) => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const formik = useFormik({
    initialValues: {
      worker: null as Worker | null,
      start_date: "",
      end_date: "",
      specific_date: "",
    },
    onSubmit: (values) => {
      const { worker, end_date, specific_date, start_date } = values;

      const filters:any = {};

      if(worker) {
        filters["worker_id"] = worker?.id;
      }

      if (start_date && !specific_date) {
        filters["start_date"] = start_date;
      }

      if (end_date && !specific_date) {
        filters["end_date"] = end_date;
      }

      if (specific_date && !start_date && !end_date) {
        filters["end_date"] = specific_date;
        filters["start_date"] = specific_date;
      }

      console.log(filters);
      setFilters(filters);
      handleClose();
    },
  });

  return (
    <Box>
      <Button
        id="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ bgcolor: "#1E1E1E", color: "white", textTransform: "none", "&:hover": { bgcolor: "#333" } }}
      >
        Filters
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Autocomplete
            fullWidth
            options={workers}
            getOptionLabel={(option: Worker) => option.first_name + " " + option.last_name}
            renderInput={(params) => 
            (
            <TextField 
            {...params} label="Worker" variant="outlined" />
          )
          }
            value={formik.values.worker}
            onChange={(event, value) => {
              formik.setFieldValue("worker", value || null);
            }}
          />
          <TextField
            fullWidth
            label="Start Date"
            variant="outlined"
            name="start_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.start_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.start_date && Boolean(formik.errors.start_date)}
            helperText={formik.touched.start_date && formik.errors.start_date}
            disabled={!!formik.values.specific_date}
          />
          <TextField
            fullWidth
            label="End Date"
            variant="outlined"
            name="end_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.end_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.end_date && Boolean(formik.errors.end_date)}
            helperText={formik.touched.end_date && formik.errors.end_date}
            disabled={!!formik.values.specific_date}
          />
          <TextField
            fullWidth
            label="Specific Date"
            variant="outlined"
            name="specific_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formik.values.specific_date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.specific_date && Boolean(formik.errors.specific_date)}
            helperText={formik.touched.specific_date && formik.errors.specific_date}
            disabled={!!formik.values.start_date || !!formik.values.end_date}
          />
          <Button type="submit" variant="contained" sx={{ bgcolor: "#1E1E1E", color: "white", "&:hover": { bgcolor: "#333" } }}>
            Apply Filters
          </Button>
          <Button onClick={() => {
            formik.resetForm();
            setFilters({});
            handleClose();
          }} sx={{ bgcolor: "#1E1E1E", color: "white", "&:hover": { bgcolor: "#333" } }}>
            Clear Filters
          </Button>
        </Box>
      </Menu>
    </Box>
  );
}