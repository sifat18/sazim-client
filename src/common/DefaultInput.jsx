/* eslint-disable react/prop-types */
import { useState } from "react";
import moment from "moment";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { blackColor40 } from "./../utility/customColor";
import FormikError from "./FormikError";
const DefaultInput = (props) => {
  const {
    id,
    label,
    placeholder,
    value,
    name,
    type,
    errors,
    touched,
    disabled,
    classes,
    inputClasses,
    trailicon,
    isNumber,
    onChange,
    min,
    max,
    step,
    onKeyDown,
    autoFocus,
    autoFocusForm,
    maxLength,
    isParentFormContainerClass,
    rows=1
  } = props;
  // const number = type === "number" ? String(Number(value)) : value;
  const [isFocusForm, setIsFocusForm] = useState(false);

  return (
    <div
      className={
        isParentFormContainerClass
          ? `form-container ${isParentFormContainerClass}`
          : `form-container`
      }
    >
      <div
        className={
          classes
            ? `form-group login-input input-xl ${classes}`
            : `form-group login-input input-xl`
        }
        onFocus={() => setIsFocusForm(true)}
        onBlur={() => setIsFocusForm(false)}
      >
        {label && (
          <label
            className={
              disabled
                ? "onFocusLabel is-disabled"
                : isFocusForm || value || value === 0 || autoFocusForm
                ? "onFocusLabel"
                : "onBlurLabel"
            }
          >
            {label}
          </label>
        )}
        {/* trailIcon */}
        {trailicon && (
          <span className={"form-icon form-trail-icon"}>{trailicon}</span>
        )}

        {/* increment & decrement buttons */}
        {isNumber && (
          <div className={"number-button-group"}>
            <button
              type="button"
              onClick={props?.incrementHandler}
              className="btn-add"
            >
              <KeyboardArrowUp sx={{ color: blackColor40 }} />
            </button>
            <button
              type="button"
              onClick={props?.decrementHandler}
              className="btn-add"
            >
              <KeyboardArrowDown sx={{ color: blackColor40 }} />
            </button>
          </div>
        )}
        {type=== "textArea" ? <textarea
               
               value={value}
               name={name}
               placeholder={placeholder}
               type={"textarea"}
               disabled={disabled}
               rows={rows || 1}
               className={"form-control"}
            />
         :<input
         // {...props}
         id={id}
         value={value}
         name={name}
         placeholder={type === "date" ? "dd/mm/yyyy" : placeholder}
         type={type}
         className={
           inputClasses ? `form-control ${inputClasses}` : `form-control`
         }
         disabled={disabled}
         min={min}
         max={max}
         maxLength={maxLength}
         // data-date={value ? moment(value).format("DD-MMMM-YYYY") : placeholder}
         data-date={value && moment(value).format("DD-MMMM-YYYY")}
         onChange={onChange}
         step={step}
         onKeyDown={onKeyDown}
         autoFocus={autoFocus}
       />}
      </div>
      <FormikError errors={errors} touched={touched} name={name} />
    </div>
  );
};

export default DefaultInput;
