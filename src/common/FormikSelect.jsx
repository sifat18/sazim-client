/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import Select from "react-select";
import { customStyles, customStylesLarge } from "../utility/selectCustomStyle";
import FormikError from "./FormikError";

export const FormikSelect = (props) => {
  const target = useRef(null);
  const [isFocusForm, setIsFocusForm] = useState(false);
  const {
    name,
    options,
    value,
    label,
    placeholder,
    errors,
    touched,
    onChange,
    setClear,
    styleMode,
    isDisabled,
    menuPosition,
    isClearable,
    isSearchable,
    isOptionDisabled,
  } = props;

  // styleMode = "small" || "medium" || "large"

  let styles = null;
  if (styleMode === "medium") {
    styles = customStyles;
  } else if (styleMode === "large") {
    styles = customStylesLarge;
  }

  return (
    <div className="form-container" id={name}>
      <div
        className="mb-3"
        ref={target}
        onFocus={() => setIsFocusForm(true)}
        onBlur={() => setIsFocusForm(false)}
      >
        {label && <label> {label} </label>}
        <Select
          instanceId="peopleDesk"
          isDisabled={isDisabled ? true : false}
          isClearable={isClearable === false ? isClearable : true} // dont use or(||), or is not valid in this case
          onChange={onChange}
          options={options || []}
          value={value || ""}
          isSearchable={isSearchable || true}
          name={name}
          styles={styles}
          placeholder={placeholder}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
          })}
          onFocus={() => setIsFocusForm(true)}
          onBlur={() => setIsFocusForm(false)}
          menuPosition={menuPosition}
          isOptionDisabled={isOptionDisabled}
          {...props}
        />
        {setClear && (
          <span
            // class="fa fa-times-circle select-cross-icon"
            onClick={() => {
              setClear(name, "");
            }}
          >
            &#10005;{" "}
          </span>
        )}
      </div>
      <FormikError  errors={errors} name={name} touched={touched} />
    </div>
  );
};

