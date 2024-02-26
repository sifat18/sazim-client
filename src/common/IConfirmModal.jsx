// IConfirmModal.js
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const IConfirmModal = (props) => {
  const { title, message, yesAlertFunc, noAlertFunc, inputFields,values, ...rest } = props;

  const handleYesClick = () => {
    if (inputFields) {
      const inputValues = {};
      inputFields.forEach((field) => {
		console.log(field);
		
        inputValues[field.id] = field.value;
      });
      yesAlertFunc(values);
    } else {
      yesAlertFunc();
    }
  };

  return confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: props?.noText || "No",
        className: "bg-danger",
        style: { marginLeft: "12rem" },
        onClick: () => noAlertFunc(),
      },
      {
        label: props?.yesText || "Yes",
        style: { backgroundColor: "#8A2BE2" },
        onClick: handleYesClick,
      },
    ],
    ...rest,
    childrenElement: () =>
      inputFields ? (
        <div className="d-flex">
          {inputFields.map((field) => (
            <div key={field.id} >
              <label>{field.label}:</label>
              <input
                type={field.type}
                id={field.id}
                value={field.value}
                onChange={(e)=>field.onChange(e)}
              />
            </div>
          ))}
        </div>
      ) : null,
  });
};

export default IConfirmModal;
