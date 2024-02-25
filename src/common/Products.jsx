/* eslint-disable react/prop-types */
import { useState } from "react";
import { BorderLayout } from "./BorderLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import IConfirmModal from "./IConfirmModal";

export const Products = ({ item }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
 
  return (
    <div >
      <BorderLayout width={100} marginTop="2rem">
        <div className="row">
          <h6 className="m-3 col-9">{item?.title}</h6>
          <div className=" mt-3 col-2" onClick={(e)=>{
            e.preventDefault()
            let confirmObject = {
              closeOnClickOutside: false,
              message: "Are you sure you want to delete this product?",
              yesAlertFunc: () => {
                // const payload = { }
                            },
              noAlertFunc: () => {
              },
            };
            IConfirmModal(confirmObject);        
            
            }}>
            <DeleteIcon />
          </div>
        </div>
        <div className="m-3">
          <p className="text-secondary">
            Categories: {item?.category.split("/").join(",")}
          </p>
          <p className="text-secondary">
            Price: ${item?.price} | Rent: ${item?.price} daily
          </p>
          <p> {showFullDescription
              ? item?.description
              : `${item?.description?.slice(0, 100)}...`}
            {!showFullDescription && (
              <span
                className="text-primary"
                onClick={() => setShowFullDescription(true)}
              >
                More Details
              </span>
            )}</p>
        </div>
        <div className="row">
          <p className="m-3 text-secondary col-9">Date Posted: {item?.date}</p>

          <div className=" mt-3 col-1">{item?.viewDetails}</div>
        </div>
      </BorderLayout>


    </div>
  );
};
