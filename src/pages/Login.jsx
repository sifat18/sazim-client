/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import DefaultInput from "../common/DefaultInput";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

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
    },
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
    },
  });
  return (
    <>
      <BorderLayout width={25}>
        <>
          {" "}
          <h2 className="text-center" style={{ marginTop: "-4rem" }}>
            SIGN IN
          </h2>
          <form
            style={{ padding: "50px 0 " }}
            className="mt-5 d-flex jusity-conter-center align-items-center flex-column "
            onSubmit={handleSubmit}
          >
            {/* Email Field */}
            <div className="w-75">
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

            {/* Password Field */}
            <div className="w-75">
              <DefaultInput
                classes="input-sm "
                placeholder="Password "
                value={values?.Password}
                name="password"
                type="password"
                onChange={(e) => {
                  setFieldValue("password", e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>

            {/* Submit Button */}
            <div>
              <PrimaryButton
                label={"LOGIN"}
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
            <p className="mt-4">
              Do you have an Account?{" "}
              <span
                style={{ color: "#8A2BE2", fontWeight: "600" }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signup");
                }}
              >
                Signup
              </span>
            </p>
          </form>
        </>
      </BorderLayout>
    </>
  );
};
