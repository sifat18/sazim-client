/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import IConfirmModal from "../common/IConfirmModal";
import { useState } from "react";
import { useFormik } from "formik";

export const ProductView = () => {
  let location = useLocation();
  const [rentalValues, setRentalValues] = useState({
    fromDate: "",
    toDate: "",
  });
  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    resetForm,
    // eslint-disable-next-line no-unused-vars
    setValues,
  } = useFormik({
    initialValues: {
      fromDate: "",
      toDate: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      // Handle form submission logic here
    },
  });
  const { product } = location.state;
  return (
    <form className="w-25 m-auto ">
      <h2 className="mt-5 pt-5">{product?.title}</h2>
      <p>
        Categories: {product?.categories?.map((info) => info?.name).join(",")}
      </p>
      <p>Price: {product?.price}</p>
      <p>{product?.description}</p>
      <div className="mt-5 pt-5 d-flex justify-content-end">
        <div
          style={{
            marginLeft: "20rem",
          }}
        >
          <PrimaryButton
            label={"Buy"}
            type={"button"}
            onClick={() => {
              let confirmObject = {
                closeOnClickOutside: false,
                message: "Are you sure you want to Buy this product?",
                yesAlertFunc: () => {
                  // const payload = { }
                },
                noAlertFunc: () => {},
              };
              IConfirmModal(confirmObject);
            }}
            className={" mx-auto border rounded font-weight-bold"}
            customStyle={{
              backgroundColor: "#8A2BE2",
              color: "white",
              width: "4rem",
              padding: "0.3rem",
            }}
          />
        </div>
        <div
          style={
            {
              //   marginLeft: "20rem",
            }
          }
        >
          <PrimaryButton
            label={"Rent"}
            type={"button"}
            onClick={() => {
              let confirmObject = {
                closeOnClickOutside: false,
                rentalValues,
                title: "Rent this product",
                yesAlertFunc: (values) => {
                  // Handle Rent logic with input values here
                  console.log("Renting with values:", values);
                },
                noAlertFunc: () => {},
                values,
                inputFields: [
                  {
                    type: "date",
                    label: "From Date",
                    id: "fromDate",
                    value: values?.fromDate,
                    onChange: (e) => {
                      {
                        // setRentalValues((prevValues) => ({
                        //     ...prevValues,
                        //     fromDate: e.target.value,
                        //   })
                        handleChange(e);
                        setFieldValue("fromDate", e.target.value);
                      }
                    },
                  },
                  {
                    type: "date",
                    label: "To Date",
                    id: "toDate",
                    value: values?.toDate,
                    onChange: (e) => {
                      setFieldValue("toDate", e.target.value);
                      handleChange(e);

                      // setRentalValues((prevValues) => ({
                      //     ...prevValues,
                      //     toDate: e.target.value,
                      //   }))
                    },
                  },
                ],
              };
              IConfirmModal(confirmObject);
            }}
            className={" mx-auto border rounded font-weight-bold"}
            customStyle={{
              backgroundColor: "#8A2BE2",
              color: "white",
              width: "4rem",
              padding: "0.3rem",
            }}
          />
        </div>
      </div>
    </form>
  );
};
