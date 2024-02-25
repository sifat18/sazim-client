/* eslint-disable react/prop-types */
export const BorderLayout = ({ width = "25",marginTop="10rem",className="", children }) => {
  return (
    <div
      className={`w-${width} border ${className} mx-auto`}
      style={{
        marginTop: `${marginTop}`,
      }}
    >
      {children}
    </div>
  );
};
