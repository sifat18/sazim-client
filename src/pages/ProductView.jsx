import { useLocation } from "react-router-dom";
import PrimaryButton from "../common/PrimaryButton";

export const ProductView = () => {
    let location = useLocation();
  const {product}=location.state
  return <div className="w-25 m-auto ">
    <h2 className="mt-5 pt-5">{product?.title}</h2>
    <p>Categories: {product?.category}</p>
    <p>Price: {product?.price}</p>
    <p>{product?.description}</p>
    <div className="mt-5 pt-5 d-flex justify-content-end">
    <div
            style={{
              marginLeft: "20rem",
            }}
          >
            <PrimaryButton
              label={"Buy"}
              type={"button"}
              className={" mx-auto border rounded font-weight-bold"}
              customStyle={{
                backgroundColor: "#8A2BE2",
                color: "white",
                width: "4rem",
                padding: "0.3rem",
              }}
            />
          </div>
          <div
            style={{
            //   marginLeft: "20rem",
            }}
          >
            <PrimaryButton
              label={"Rent"}
              type={"button"}
              className={" mx-auto border rounded font-weight-bold"}
              customStyle={{
                backgroundColor: "#8A2BE2",
                color: "white",
                width: "4rem",
                padding: "0.3rem",
              }}
            />
          </div>
    </div>
  </div>;
};
