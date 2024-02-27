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
          id
          label
        }
        description
        createdAt
        categories {
          id
          name
        }
        createdBy
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  console.log({ data });
  const [products, setProducts] = useState([
    {
      title: "Smartwatch X1",
      description:
        "Stay connected with the latest Smartwatch X1, featuring health tracking, notifications, and a sleek design.",
      category: "Electronics/Wearable",
      price: 129.99,
      date: "2024-02-26",
      rent: 19.99,
      viewDetails: "2.5M",
    },
    {
      title: "Vintage Leather Backpack",
      description:
        "Classic vintage leather backpack for a stylish and practical look. Ideal for daily use or short trips.",
      category: "Fashion/Accessories",
      price: 79.95,
      date: "2024-02-26",
      rent: 14.99,
      viewDetails: "2.5M",
    },
    // {
    //   title: "Espresso Machine Deluxe",
    //   description:
    //     "Enjoy barista-quality coffee at home with our Espresso Machine Deluxe. Easy to use and customizable for your perfect brew.",
    //   category: "Home & Kitchen/Appliances",
    //   price: 249.99,
    //   date: "2024-02-26",
    //   rent: 29.99,
    //   viewDetails: "2.5M",
    // },
    // {
    //   title: "Fitness Tracker Pro",
    //   description:
    //     "Achieve your fitness goals with the Fitness Tracker Pro, equipped with heart rate monitoring, GPS, and workout tracking.",
    //   category: "Sports & Outdoors/Fitness",
    //   price: 89.99,
    //   date: "2024-02-26",
    //   rent: 12.99,
    //   viewDetails: "2.5M",
    // },
    // {
    //   title: "4K Ultra HD Smart TV",
    //   description:
    //     "Immerse yourself in stunning visuals with our 4K Ultra HD Smart TV. Access your favorite apps and enjoy a cinematic experience at home.",
    //   category: "Electronics/TV & Home Theater",
    //   price: 599.99,
    //   date: "2024-02-26",
    //   rent: 49.99,
    //   viewDetails: "2.5M",
    // },
  ]);
  const click = (item) => {
    navigate(`/buy-rent/${item?.title}`, { state: { product: item } });
  };
  return (
    <div className="w-25 mx-auto">
      {/* <BorderLayout width={25}> */}

      <h2 className="text-center text-uppercase" style={{ paddingTop: "7rem" }}>
        All Products
      </h2>
      {products?.length > 0
        ? products?.map((product) => (
            <Products item={product} key={product?.title} click={click} />
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
