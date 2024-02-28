/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";
import IConfirmModal from "../common/IConfirmModal";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import CommonDialog from "../common/CommonDialog";
import DefaultInput from "../common/DefaultInput";
import { gql, useMutation } from "@apollo/client";
import { useSelector } from "react-redux";

const inputs = [
  {
    name: "fromDate",
    label: "From",
  },
  {
    name: "toDate",
    label: "To",
  },
];

export const ProductView = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const { id } = useSelector((state) => state.auth);
  console.log({ id });
  const { product } = location.state;

  const ADD_TRANSACTOION = gql`
    mutation Mutation(
      $userId: Int!
      $productId: Int!
      $type: String!
      $fromDate: String
      $toDate: String
    ) {
      addTransaction(
        userId: $userId
        productId: $productId
        type: $type
        fromDate: $fromDate
        toDate: $toDate
      ) {
        id
        user {
          id
          email
          firstName
          products {
            id
            title
            price
          }
        }
      }
    }
  `;
  const [open, setOpen] = useState(false);
  const [addTransaction, { data, loading, error }] =
    useMutation(ADD_TRANSACTOION);

  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    resetForm,
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

  const submitHandler = () => {
    addTransaction({
      variables: {
        userId: id,
        productId: product.id,
        type: "Lend",
        fromDate: values.fromDate,
        toDate: values.toDate,
      },
    });
    setOpen(false);
  };
  useEffect(() => {
    if (!loading && data?.addTransaction?.id) {
      navigate("/overview");
    }
  }, [loading, data]);
  return (
    <form className="w-25 m-auto ">
      <h2 className="mt-5 pt-5">{product?.title}</h2>
      <p>Categories: {product?.categories?.map((it) => it?.name)?.join(",")}</p>
      <p>Price: ${product?.price}</p>
      <p>{product?.description}</p>
      <div className="mt-5 pt-5 d-flex justify-content-end">
        <div
          style={{
            marginLeft: "20rem",
          }}
        >
          <PrimaryButton
            label={"Rent"}
            type={"button"}
            onClick={() => {
              setOpen(true);
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
        <div>
          <PrimaryButton
            label={"Buy"}
            type={"button"}
            onClick={() => {
              let confirmObject = {
                closeOnClickOutside: false,
                message: "Are you sure you want to Buy this product?",
                yesAlertFunc: () => {
                  // const payload = { }
                  addTransaction({
                    variables: {
                      userId: id,
                      productId: product.id,
                      type: "Bought",
                    },
                  });
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
      </div>
      <CommonDialog
        propsObj={{
          open,
          setOpen,
          handleSubmit: () => {
            submitHandler();
          },
          title: "Rental Period",
          btnConfirmTitle: "Confirm Rent",
          btnCancelTitle: "Go Back",
        }}
      >
        <div className="d-flex justify-content-between">
          {inputs?.map((item, index) => (
            <div key={index}>
              <label style={{ margin: 0, fontWeight: 500 }}>{item.label}</label>
              <DefaultInput
                value={values[item.name]}
                name={item.name}
                type="date"
                onChange={(e) => {
                  setFieldValue(`${item.name}`, e.target.value);
                }}
                errors={errors}
                touched={touched}
              />
            </div>
          ))}
        </div>
      </CommonDialog>
    </form>
  );
};
