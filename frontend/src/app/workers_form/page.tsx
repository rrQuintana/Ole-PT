"use client";

import { useNotification } from "@/components/Notification";
import createWorker from "@/logic/hooks/workers/createWorker";
import { usersFormValidationSchema, usersInitialValues } from "@/logic/validators/usersForm.validation.schema";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WorkerForm() {
  const router = useRouter();
  const notificationContext = useNotification();
  const showNotification = notificationContext ? notificationContext.showNotification : () => { };
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: usersInitialValues,
    validationSchema: usersFormValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await createWorker(values);
        await showNotification("Worker created successfully", "success");
        router.push("/");
      } catch (error) {
        console.error("Error creating worker:", error);
        showNotification("Error creating worker", "error");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form className="flex flex-1 flex-col p-10 rounded-md w-3/5 mx-auto" onSubmit={formik.handleSubmit}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "grey.300", mb: 5 }}>
        Worker Form
      </Typography>
      <TextField
        fullWidth
        label="First Name"
        variant="outlined"
        name="first_name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
        helperText={formik.touched.first_name && formik.errors.first_name}
        InputProps={{ sx: { bgcolor: "#1E1E1E", color: "white" } }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Last Name"
        variant="outlined"
        name="last_name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
        helperText={formik.touched.last_name && formik.errors.last_name}
        InputProps={{ sx: { bgcolor: "#1E1E1E", color: "white" } }}
        sx={{ mb: 3 }}
      />
      <TextField
        fullWidth
        label="Phone Number"
        variant="outlined"
        name="phone_number"
        value={formik.values.phone_number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
        helperText={formik.touched.phone_number && formik.errors.phone_number}
        InputProps={{ sx: { bgcolor: "#1E1E1E", color: "white" } }}
        sx={{ mb: 3 }}
      />
      <div className="flex flex-row-space-x-3 w-full justify-between mt-5">
        <Button
          variant="contained"
          color="secondary"
          sx={{ bgcolor: "#1E1E1E", color: "white" }}
          onClick={() => router.push("/")}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Submit
        </Button>
      </div>
    </form>

  );
}