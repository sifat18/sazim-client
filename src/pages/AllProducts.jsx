/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../common/Products";
import PrimaryButton from "../common/PrimaryButton";
import { useQuery, gql } from "@apollo/client";

export const AllProducts = () => {
  const navigate = useNavigate();
  const GET_PRODUCTS = gql`
    query Query {
      products {
        id
        title
        price
        rent
        rentType {
          label
        }
        description
        createdAt
        categories {
          name
        }
        createdBy
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  console.log({ data });

  const click = (item) => {
    navigate(`/buy-rent/${item?.title}`, { state: { product: item } });
  };
  return (
    <div className="w-25 mx-auto">
      {/* <BorderLayout width={25}> */}

      <h2 className="text-center text-uppercase" style={{ paddingTop: "7rem" }}>
        All Products
      </h2>
      {data?.products?.length > 0
        ? data?.products?.map((product) => (
            <Products item={product} key={product?.title} click={click} />
          ))
        : null}
      <div style={{ marginLeft: "14rem" }}>
        <PrimaryButton
          label={"Add Product"}
          type={"button"}
          onClick={() => navigate("/create-product")}
          className={"mt-5 mx-auto border rounded font-weight-bold"}
          customStyle={{
            backgroundColor: "#8A2BE2",
            color: "white",
            width: "10rem",
            padding: "0.7rem",
          }}
        />
      </div>
    </div>
  );
};
