/* eslint-disable no-unused-vars */

import {
  disableColor,
  gray100,
  gray300,
  gray600,
  gray700,
  success500,
  whiteColor,
} from "./customColor";

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "30px",
    height: "30px",
    borderRadius: "4px",
    border: `1px solid ${gray300}`,
    ":hover": {
      border: `1px solid ${gray600}!important`,
    },
    ":focus": {
      border: `1px solid ${success500}!important`,
    },
    boxShadow: `${success500}!important`,
  }),
  menu: (provided, state) => ({
    ...provided,
    zIndex: 999,
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),
  valueOption: (provided, state) => ({
    ...provided,
    zIndex: 999999,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    color: gray700,
    height: "26px",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: "0px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0px",
    paddingRight: "3px",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "30px",
  }),
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "20px",
    paddingLeft: 18,
    color: isDisabled ? disableColor : isSelected ? gray700 : gray700,
    backgroundColor: isDisabled
      ? disableColor
      : isSelected
      ? gray100
      : isFocused
      ? gray100
      : whiteColor,
    ":active": {
      backgroundColor: !isDisabled
        ? isSelected
          ? gray100
          : whiteColor
        : whiteColor,
    },
    zIndex: 99999999,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontSize: 14,
    fontWeight: 400,
    textOverflow: "ellipsis",
    maxWidth: "95%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: gray700,
  }),
};

export const customStylesLarge = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "56px",
    height: "56px",
    borderRadius: "4px",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "56px",
    padding: "0 6px",
  }),
  valueOption: (provided, state) => ({
    ...provided,
    zIndex: 999999,
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "56px",
  }),
  option: (provided, { isDisabled, isFocused, isSelected }) => ({
    ...provided,
    fontWeight: 500,
    fontSize: 12,
    lineHeight: "18px",
    letterSpacing: 0.1,
    paddingLeft: 18,
    color: isDisabled ? disableColor : isSelected ? gray700 : gray700,
    backgroundColor: isDisabled
      ? disableColor
      : isSelected
      ? gray100
      : isFocused
      ? gray100
      : whiteColor,
    ":active": {
      backgroundColor: !isDisabled
        ? isSelected
          ? gray100
          : whiteColor
        : whiteColor,
    },
    zIndex: 99999999,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    // fontSize: 12,
    textOverflow: "ellipsis",
    maxWidth: "95%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    color: gray700,
  }),
};
