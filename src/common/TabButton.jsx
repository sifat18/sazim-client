import PrimaryButton from "./PrimaryButton";

// eslint-disable-next-line react/prop-types
const TabButton = ({ label, onClick, customStyle }) => {
  return (
    <PrimaryButton
      label={label}
      type="button"
      onClick={onClick}
      className="col-3 border rounded"
      customStyle={{
        backgroundColor: "white",
        color: "#8A2BE2",
        padding: "0.6rem",
        border: "1px solid #8A2BE2",
        ...customStyle, // Allow additional styles to be passed
      }}
    />
  );
};

export default TabButton;
