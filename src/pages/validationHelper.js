import * as yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// for product schema

export const productValidationSchema = yup.object().shape({
  rent: yup.number().required("Rent  is required"),
  categories: yup.array().of(
    yup.object().shape({
      label: yup.string().required("Categories is required"),
      value: yup.string().required("Categories is required"),
    })
  ),
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  description: yup.string().required("description is required"),
  dayType: yup.object().shape({
    label: yup.string().required("dayType is required"),
    value: yup.string().required("dayType is required"),
  }),
});
// for login schema

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
// for register schema
export const registerValidationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain 8 characters, one uppercase, one lowercase, one number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Please enter the password again")
    .oneOf(
      [yup.ref("password"), "Confirm Password is required"],
      "Passwords didn't match"
    ),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
});
