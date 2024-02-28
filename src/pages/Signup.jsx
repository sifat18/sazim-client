/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import DefaultInput from "../common/DefaultInput";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/aurth/authSlice";
import { SIGN_UP } from "./apiHelper";
import { registerValidationSchema } from "./validationHelper";

export const Signup = () => {
  const navigate = useNavigate();

  const [signup, { data, loading, error }] = useMutation(SIGN_UP);
  const dispatch = useDispatch();

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
    validationSchema: registerValidationSchema,
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
    },
  });
  useEffect(() => {
    if (!loading && data?.signUp?.id) {
      dispatch(
        setUser({
          name: data?.signUp?.firstName + " " + data?.signUp?.lastName,
          email: data?.signUp?.email,
          id: data?.signUp?.id,
        })
      );
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data]);

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
