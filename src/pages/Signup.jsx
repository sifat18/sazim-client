/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import DefaultInput from "../common/DefaultInput";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

export const Signup = () => {
  const navigate = useNavigate();

  const SIGN_UP = gql`
    mutation SignUp(
      $email: String!
      $firstName: String!
      $lastName: String!
      $password: String!
    ) {
      signUp(
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      ) {
        id
        email
        firstName
        lastName
        password
        createdAt
      }
    }
  `;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
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
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .required("Phone number is required"),
  });
  const [signup, { data, loading, error }] = useMutation(SIGN_UP);

  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    enableReinitialize: true,
    validationSchema: validationSchema,
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
    },
    onSubmit: (values) => {
      // Handle form submission logic here
      signup({
        variables: values,
      });
      data?.signUp?.id && navigate("/");
    },
  });
  return (
    <>
      <BorderLayout width={25} className={"text-center"}>
        <>
          {" "}
          <h2 className="text-center" style={{ marginTop: "-4rem" }}>
            SIGN UP
          </h2>
          <form
            style={{ padding: "30px 10px " }}
            className="mt-5 row  mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="col-6 ">
              <DefaultInput
                classes=" "
                placeholder="First Name"
                value={values?.firstName}
                name="firstName"
                type="text"
                onChange={(e) => {
                  setFieldValue("firstName", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>
            {/* last Field */}
            <div className="col-6 ">
              <DefaultInput
                classes=" "
                placeholder="Last Name "
                value={values?.lastName}
                name="lastName"
                type="text"
                onChange={(e) => {
                  setFieldValue("lastName", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="col-12">
              <DefaultInput
                classes=" "
                placeholder="Address "
                value={values?.address}
                name="address"
                type="address"
                onChange={(e) => {
                  setFieldValue("address", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="col-6">
              <DefaultInput
                classes=" "
                placeholder="Email "
                value={values?.email}
                name="email"
                type="email"
                onChange={(e) => {
                  setFieldValue("email", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="col-6">
              <DefaultInput
                classes=" "
                placeholder="Phone Number"
                value={values?.phone}
                name="phone"
                type="text"
                onChange={(e) => {
                  setFieldValue("phone", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>

            {/* Password Field */}
            <div className="col-12">
              <DefaultInput
                classes="input-sm "
                placeholder="Password "
                value={values?.password}
                name="password"
                type="password"
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>
            <div className="col-12">
              <DefaultInput
                classes="input-sm "
                placeholder="Confirm Password "
                value={values?.confirmPassword}
                name="confirmPassword"
                type="password"
                onChange={(e) => {
                  setFieldValue("confirmPassword", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>

            {/* Submit Button */}
            <div className="col-12">
              <PrimaryButton
                label={"Register"}
                type={"submit"}
                className={"mt-5 border rounded "}
                customStyle={{
                  backgroundColor: "#8A2BE2",
                  color: "white",
                  width: "5rem",
                  padding: "0.3rem",
                }}
              />
            </div>
            <p className="col-12 mt-3">
              Already have an account?{" "}
              <span
                style={{ color: "#8A2BE2", fontWeight: "600" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Sign in
              </span>
            </p>
          </form>
        </>
      </BorderLayout>
    </>
  );
};
