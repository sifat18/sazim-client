/* eslint-disable react/prop-types */
import { useState } from "react";
import { BorderLayout } from "./BorderLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import IConfirmModal from "./IConfirmModal";
import { gql, useMutation } from "@apollo/client";

export const Products = ({ item, click, deleteBtn = false }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const DELETE_PRODUCT = gql`
    mutation Mutation($productId: Int!) {
      deleteProduct(productId: $productId) {
        id
        title
      }
    }
  `;
  const [removeProduct] = useMutation(DELETE_PRODUCT);

  return (
    <div
      onClick={() => {
        click(item);
      }}
    >
      <BorderLayout width={100} marginTop="2rem">
        <div className="row">
          <h6 className="m-3 col-9">{item?.title}</h6>
          {deleteBtn ? (
            <div
              className=" mt-3 col-2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                let confirmObject = {
                  closeOnClickOutside: false,
                  message: "Are you sure you want to delete this product?",
                  yesAlertFunc: () => {
                    console.log(item?.id);
                    removeProduct({
                      variables: { productId: item?.id },
                    });
                    window.location.reload();
                  },
                  noAlertFunc: () => {},
                };
                IConfirmModal(confirmObject);
              }}
            >
              <DeleteIcon />
            </div>
          ) : null}
        </div>
        <div className="m-3">
          <p className="text-secondary">
            Categories:{" "}
            {item?.categories?.map((category) => category.name).join(",")}
          </p>
          <p className="text-secondary">
            Price: ${item?.price} | Rent: ${item?.rent} {item?.rentType?.label}
          </p>
          <p>
            {" "}
            {showFullDescription
              ? item?.description
              : `${item?.description?.slice(0, 100)}...`}
            {!showFullDescription && (
              <span
                className="text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowFullDescription(true);
                }}
              >
                More Details
              </span>
            )}
          </p>
        </div>
        <div className="row">
          <p className="m-3 text-secondary col-7">
            Date Posted:{" "}
            {new Date(+item?.createdAt)?.toLocaleString("en-US", options)}
          </p>

          <div className=" mt-3 col-4">
            {parseInt(Math.random() * 10000)} views
          </div>
        </div>
      </BorderLayout>
    </div>
  );
};
