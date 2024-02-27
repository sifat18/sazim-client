/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useFormik } from "formik";
import * as yup from "yup";
import DefaultInput from "../common/DefaultInput";
import PrimaryButton from "../common/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import { FormikSelect } from "../common/FormikSelect";
import { gray600, success500 } from "../utility/customColor";
import { customStyles } from "./../utility/selectCustomStyle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
export const EditProduct = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [categories, setCategories] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);

  const { product } = location.state;

  const validationSchema = yup.object().shape({
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
  const GET_Categories = gql`
    query Query {
      categories {
        id
        name
      }
    }
  `;
  const GET_Rentyps = gql`
    query Query {
      rentypes {
        id
        label
      }
    }
  `;

  const EDIT = gql`
    mutation Mutation(
      $productId: Int!
      $title: String
      $description: String
      $rent: Float
      $price: Float
      $rentTypeId: Int
      $categoryIds: [Int!]
    ) {
      updateProduct(
        productId: $productId
        title: $title
        description: $description
        rent: $rent
        price: $price
        rentTypeId: $rentTypeId
        categoryIds: $categoryIds
      ) {
        id
        title
      }
    }
  `;
  const { data } = useQuery(GET_Categories);
  const { data: Rentyps } = useQuery(GET_Rentyps);
  const [edit, { data: editData, loading, error }] = useMutation(EDIT);

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
      rent: product?.rent,
      categories: product?.categories?.map((item, index) => {
        return {
          value: item?.id,
          label: item?.name,
        };
      }),
      title: product?.title,
      price: product?.price,
      description: product?.description,
      dayType: {
        value: product?.rentType?.id,
        label: product?.rentType?.label,
      },
    },
    onSubmit: (values) => {
      // Handle form submission logic here
      console.log("Form submitted with values:", values);
      edit({
        variables: {
          productId: product?.id,
          title: values?.title,
          description: values?.description,
          rent: parseFloat(values?.rent),
          price: parseFloat(values?.price),
          rentTypeId: values?.dayType?.value,
          categoryIds: values?.categories?.map((item) => +item?.value),
        },
      });
    },
  });

  useEffect(() => {
    if (data?.categories?.length > 0) {
      setCategories(
        data?.categories?.map((item) => {
          return { label: item?.name, value: item?.id };
        })
      );
    }
    if (Rentyps?.rentypes?.length > 0) {
      setRentTypes(
        Rentyps?.rentypes?.map((item) => {
          return { ...item, value: item?.id };
        })
      );
    }
  }, [data, Rentyps]);
  useEffect(() => {
    if (editData?.updateProduct?.id) {
      navigate("/");
    }
  }, [editData]);
  return (
    <>
      <form
        style={{ padding: "30px 10px " }}
        className="mt-5 row  mx-auto w-25"
        onSubmit={handleSubmit}
      >
        <div className="col-12 ">
          <label htmlFor="">Title</label>
          <DefaultInput
            classes=" "
            placeholder="Title"
            value={values?.title}
            name="title"
            type="text"
            onChange={(e) => {
              setFieldValue("title", e.target.value);
            }}
            errors={errors}
            touched={touched}
          />
        </div>
        {/* last Field */}
        <div className="col-12 ">
          <FormikSelect
            placeholder=" "
            classes="input-sm"
            styles={{
              ...customStyles,
              // eslint-disable-next-line no-unused-vars
              control: (provided, state) => ({
                ...provided,
                minHeight: "auto",
                height: values?.categories?.length > 1 ? "auto" : "30px",
                borderRadius: "4px",
                boxShadow: `${success500}!important`,
                ":hover": {
                  borderColor: `${gray600}!important`,
                },
                ":focus": {
                  borderColor: `${gray600}!important`,
                },
              }),
              // eslint-disable-next-line no-unused-vars
              valueContainer: (provided, state) => ({
                ...provided,
                height: values?.categories?.length > 1 ? "auto" : "30px",
                padding: "0 6px",
              }),
              multiValue: (styles) => {
                return {
                  ...styles,
                  position: "relative",
                  top: "-1px",
                };
              },
              multiValueLabel: (styles) => ({
                ...styles,
                padding: "0",
              }),
            }}
            name="categories"
            options={categories?.length > 0 ? categories : []}
            value={values?.categories}
            onChange={(valueOption) => {
              setFieldValue("categories", valueOption);
            }}
            isMulti
            errors={errors}
            touched={touched}
          />
        </div>
        <div className="col-12">
          <label htmlFor="">Description</label>
          <DefaultInput
            classes=""
            placeholder=" "
            value={values?.description}
            name="description"
            type="textArea"
            rows={5}
            onChange={(e) => {
              setFieldValue("description", e.target.value);
            }}
            errors={errors}
            touched={touched}
          />
        </div>
        <div className="col-4">
          <label htmlFor="">Price</label>
          <DefaultInput
            classes=""
            placeholder=" "
            value={values?.price}
            name="price"
            type="number"
            onChange={(e) => {
              setFieldValue("price", e.target.value);
            }}
            errors={errors}
            touched={touched}
          />
        </div>
        <div className="col-3">
          <label htmlFor="">Rent</label>
          <DefaultInput
            classes=""
            placeholder=" "
            value={values?.rent}
            name="rent"
            inputClasses=""
            type="number"
            onChange={(e) => {
              setFieldValue("rent", e.target.value);
            }}
            errors={errors}
            touched={touched}
          />
        </div>

        {/* Password Field */}
        <div className="col-5 mt-4 pt-3">
          <FormikSelect
            placeholder="Select an option "
            classes=""
            styles={customStyles}
            name="dayType"
            options={rentTypes?.length > 0 ? rentTypes : []}
            value={values?.dayType}
            onChange={(valueOption) => {
              setFieldValue("dayType", valueOption);
            }}
            errors={errors}
            touched={touched}
          />
        </div>

        {/* Submit Button */}
        <div className="col-12 " style={{ marginLeft: "17rem" }}>
          <PrimaryButton
            label={"Edit Product"}
            type={"submit"}
            className={"mt-5 border rounded "}
            customStyle={{
              backgroundColor: "#8A2BE2",
              color: "white",
              width: "10rem",
              padding: "0.6rem",
            }}
          />
        </div>
      </form>
    </>
  );
};
