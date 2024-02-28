/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import DefaultInput from "../common/DefaultInput";
import PrimaryButton from "../common/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/aurth/authSlice";
import { useEffect } from "react";
import { SIGN_IN } from "./apiHelper";
import { loginValidationSchema } from "./validationHelper";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signin, { data, loading, error }] = useMutation(SIGN_IN);

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
    validationSchema: loginValidationSchema,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // Handle form submission logic here
      signin({
        variables: values,
      });
    },
  });
  useEffect(() => {
    if (!loading && data?.signin?.id) {
      localStorage.setItem("data", JSON.stringify(data?.signin));
      dispatch(
        setUser({
          name: data?.signin?.firstName + " " + data?.signin?.lastName,
          email: data?.signin?.email,
          id: data?.signin?.id,
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
