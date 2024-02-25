import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DefaultInput from "../common/DefaultInput";
import PrimaryButton from "../common/PrimaryButton";
import { FormikSelect } from "../common/FormikSelect";
import { gray600, success500 } from "../utility/customColor";
import { customStyles } from "./../utility/selectCustomStyle";

// import { useNavigate } from "react-router-dom";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

const validationSchema = Yup.object().shape({
  rent: Yup.number().required("Rent  is required"),
  categories: Yup.string().required("Categories is required"),
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("description is required"),
  dayType: Yup.string().required("dayType is required"),
});

export const CreateProduct = () => {
  const [currentStep, setCurrentStep] = useState(0);
  //   const navigate = useNavigate();

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
        rent:"",
        categories:"",
        title:"",
        price:"",
        description:"",
        dayType:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      // Handle form submission logic here
    },
  });

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="w-25 mx-auto">
      {/* <BorderLayout width={25}> */}

      <form onSubmit={handleSubmit}>
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
              options={[
                { label: "All", value: 0 },
                { label: "All2", value: 1 },
                { label: "All3", value: 3 },
              ]}
              value={values?.categories || { label: "All", value: 0 }}
              onChange={(valueOption) => {
                setFieldValue("categories", valueOption);
              }}
              isMulti
              errors={errors}
              touched={touched}
            />
          </>
        )}
        {currentStep === 2 && (
          <>
            <h4 className="text-center " style={{ paddingTop: "7rem" }}>
              Select description{" "}
            </h4>
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
          </>
        )}
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
              inputClasses='w-50'
              type="number"
              onChange={(e) => {
                setFieldValue("rent", e.target.value);
              }}
              errors={errors}
              touched={touched}
            />
                </div>
                <div className="col-6 mt-4 pt-3" >
                <FormikSelect
                          placeholder="Select an option "
                          classes=""
                          styles={customStyles}
                          name="dayType"
                          options={ []}
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

{currentStep === 4 && (
          <>
            <h4 className="text-center " style={{ paddingTop: "7rem" }}>
              Summary{" "}
            </h4>
         <div className="ml-2">
            <p>Title: {values?.title}</p>
            <p>Categories: {values?.categories}</p>
            <p>Description: {values?.description}</p>
            <p>Price: {values?.price}, To rent:{values?.rent} {values?.dayType}</p>
         
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
