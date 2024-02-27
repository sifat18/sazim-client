/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../common/Products";
import PrimaryButton from "../common/PrimaryButton";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";

export const Home = () => {
  const { id } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const GET_PRODUCTS = gql`
    query User($userId: Int!) {
      user(id: $userId) {
        products {
          id
          title
          price
          rent
          description
          createdAt
          categories {
            id
            name
          }
          rentType {
            id
            label
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { userId: id }, // Pass the user ID as a variable
  });
  console.log({ data });

  const click = (item) => {
    navigate(`/edit/${item?.title}`, { state: { product: item } });
  };

  return (
    <div className="w-25 mx-auto">
      {/* <BorderLayout width={25}> */}

      <h2 className="text-center text-uppercase" style={{ paddingTop: "7rem" }}>
        My Products
      </h2>
      {data?.user?.products?.length > 0
        ? data?.user?.products?.map((product) => (
            <Products
              item={product}
              key={product?.title}
              click={click}
              deleteBtn={true}
            />
          ))
        : null}
      <div style={{ marginLeft: "20rem" }}>
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
