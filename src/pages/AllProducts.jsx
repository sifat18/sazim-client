/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../common/Products";
import PrimaryButton from "../common/PrimaryButton";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "./apiHelper";

export const AllProducts = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PRODUCTS);

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
    </div>
  );
};
