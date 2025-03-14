import * as Yup from "yup";

export const usersFormValidationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
})

export const usersInitialValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
};