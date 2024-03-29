import { useEffect, useState } from "react";
import { useFormik } from "formik";

import DefaultInput from "../common/DefaultInput";
import PrimaryButton from "../common/PrimaryButton";
import { FormikSelect } from "../common/FormikSelect";
import { gray600, success500 } from "../utility/customColor";
import { customStyles } from "./../utility/selectCustomStyle";
import { useMutation, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ADD_PRODUCT, GET_Categories, GET_Rentyps } from "./apiHelper";
import { productValidationSchema } from "./validationHelper";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

export const CreateProduct = () => {
  // user  fetch
  const { id } = useSelector((state) => state.auth);
  // state
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [rentTypes, setRentTypes] = useState([]);
  // routing
  const navigate = useNavigate();
  const { data } = useQuery(GET_Categories);
  const { data: Rentyps } = useQuery(GET_Rentyps);
  const [addproduct, { data: Product }] = useMutation(ADD_PRODUCT);
  const {
    setFieldValue,
    values,
    errors,
    touched,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    resetForm,
    // eslint-disable-next-line no-unused-vars
    setValues,
  } = useFormik({
    initialValues: {
      rent: "",
      categories: "",
      title: "",
      price: "",
      description: "",
      dayType: "",
    },
    validationSchema: productValidationSchema,
    onSubmit: (values) => {
      // Handle form submission logic here
      addproduct({
        variables: {
          title: values?.title,
          price: parseFloat(values?.price),
          rent: parseFloat(values?.rent),
          rentId: +values?.dayType?.value,
          description: values?.description,
          categoryIds: values?.categories?.map((item) => +item?.value),
          createdBy: +id,
        },
      });
    },
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
  // select fields options set
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
    if (Product?.createProduct?.id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Product]);

  return (
    <div className="w-25 mx-auto">
      <form onSubmit={handleSubmit}>
        {/* step 1 */}
        {currentStep === 0 && (
          <>
            <h4 className="text-center " style={{ paddingTop: "7rem" }}>
              Select a title for your product{" "}
            </h4>

            <DefaultInput
              classes=" "
              placeholder=" "
              value={values?.title}
              name="title"
              type="text"
              onChange={(e) => {
                setFieldValue("title", e.target.value);
              }}
              errors={errors}
              touched={touched}
            />
          </>
        )}
        {/* step 2 */}

        {currentStep === 1 && (
          <>
            <h4 className="text-center " style={{ paddingTop: "7rem" }}>
              Select a title for your product{" "}
            </h4>

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
          </>
        )}
        {/* step 3 */}
        {currentStep === 2 && (
          <>
            <h4 className="text-center " style={{ paddingTop: "7rem" }}>
              Select description{" "}
            </h4>
            <DefaultInput
              classes=""
              value={values?.description}
              placeholder=" "
              name="description"
              type="textArea"
              rows={5}
              onChange={(e) => {
                setFieldValue("description", e.target.value);
              }}
              errors={errors}
              touched={touched}
            />
          </>
        )}
        {/* step 4 */}
        {currentStep === 3 && (
          <>
            <h4 className="text-center " style={{ paddingTop: "7rem" }}>
              Select price{" "}
            </h4>
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
            <div className="row">
              <div className="col-6 mt-1">
                <label htmlFor="">Rent</label>
                <DefaultInput
                  classes=""
                  placeholder=" "
                  value={values?.rent}
                  name="rent"
                  inputClasses="w-50"
                  type="number"
                  onChange={(e) => {
                    setFieldValue("rent", e.target.value);
                  }}
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className="col-6 mt-4 pt-3">
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
            </div>
          </>
        )}
        {/* step 5 */}
        {currentStep === 4 && (
          <>
            <h4 className="text-center " style={{ paddingTop: "7rem" }}>
              Summary{" "}
            </h4>
            <div className="ml-2">
              <p>Title: {values?.title}</p>
              <p>
                Categories:{" "}
                {values?.categories
                  ?.map((category) => category?.label)
                  .join(",")}
              </p>
              <p>Description: {values?.description}</p>
              <p>
                Price: {values?.price}, To rent:{values?.rent}{" "}
                {values?.dayType?.label}
              </p>
            </div>
          </>
        )}

        {/* Navigation buttons */}
        {currentStep > 0 && (
          <PrimaryButton
            label={"Prev"}
            type={"button"}
            onClick={handlePrev}
            className={"mt-5 mx-auto border rounded font-weight-bold"}
            customStyle={{
              backgroundColor: "#8A2BE2",
              color: "white",
              width: "10rem",
              padding: "0.7rem",
            }}
          />
        )}
        {/* next btn */}
        {currentStep < steps.length - 1 && (
          <div
            style={{
              marginLeft: "20rem",
              marginTop: currentStep ? "-2.7rem" : "",
            }}
          >
            <PrimaryButton
              label={"Next"}
              type={"button"}
              onClick={handleNext}
              className={" mx-auto border rounded font-weight-bold"}
              customStyle={{
                backgroundColor: "#8A2BE2",
                color: "white",
                width: "10rem",
                padding: "0.7rem",
              }}
            />
          </div>
        )}
        {/* submit btn */}
        {currentStep === steps.length - 1 && (
          <div
            style={{
              marginLeft: "20rem",
              marginTop: currentStep ? "-2.7rem" : "",
            }}
          >
            <PrimaryButton
              label={"Submit"}
              type={"submit"}
              className={" mx-auto border rounded font-weight-bold"}
              customStyle={{
                backgroundColor: "#8A2BE2",
                color: "white",
                width: "10rem",
                padding: "0.7rem",
              }}
            />
          </div>
        )}
      </form>
      <div style={{ marginLeft: "20rem" }}></div>
    </div>
  );
};
