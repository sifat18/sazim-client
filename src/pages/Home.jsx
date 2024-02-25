/* eslint-disable no-unused-vars */
import { BorderLayout } from "../common/BorderLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../common/Products";

export const Home = () => {
  const navigate = useNavigate();

 
const [products, setProducts] = useState([
  {
    "title": "Smartwatch X1",
    "description": "Stay connected with the latest Smartwatch X1, featuring health tracking, notifications, and a sleek design.",
    "category": "Electronics/Wearable",
    "price": 129.99,
    "date": "2024-02-26",
    "rent": 19.99,
    "viewDetails": "2.5M"
  },
  {
    "title": "Vintage Leather Backpack",
    "description": "Classic vintage leather backpack for a stylish and practical look. Ideal for daily use or short trips.",
    "category": "Fashion/Accessories",
    "price": 79.95,
    "date": "2024-02-26",
    "rent": 14.99,
    "viewDetails": "2.5M"
  },
  {
    "title": "Espresso Machine Deluxe",
    "description": "Enjoy barista-quality coffee at home with our Espresso Machine Deluxe. Easy to use and customizable for your perfect brew.",
    "category": "Home & Kitchen/Appliances",
    "price": 249.99,
    "date": "2024-02-26",
    "rent": 29.99,
    "viewDetails": "2.5M"
  },
  {
    "title": "Fitness Tracker Pro",
    "description": "Achieve your fitness goals with the Fitness Tracker Pro, equipped with heart rate monitoring, GPS, and workout tracking.",
    "category": "Sports & Outdoors/Fitness",
    "price": 89.99,
    "date": "2024-02-26",
    "rent": 12.99,
    "viewDetails": "2.5M"
  },
  {
    "title": "4K Ultra HD Smart TV",
    "description": "Immerse yourself in stunning visuals with our 4K Ultra HD Smart TV. Access your favorite apps and enjoy a cinematic experience at home.",
    "category": "Electronics/TV & Home Theater",
    "price": 599.99,
    "date": "2024-02-26",
    "rent": 49.99,
    "viewDetails": "2.5M"
  }
]
);

  
  return (
    <>
      {/* <BorderLayout width={25}> */}
        <>
          {" "}
          <h2 className="text-center text-uppercase" style={{ paddingTop: "7rem" }}>
            My Products
          </h2>
       {products?.length > 0 ? 
       products?.map(product=>(
<Products item={product}  key={product?.title}/>
       ))
       :null}
        </>
      {/* </BorderLayout> */}
    </>
  );
};
