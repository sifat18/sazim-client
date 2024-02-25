/* eslint-disable react/prop-types */
export const BorderLayout = ({ width = 25, children }) => {
  return (
    <div
      className={`w-${width} border text-center mx-auto`}
      style={{
        marginTop: "10rem",
      }}
    >
      {children}
    </div>
  );
};
