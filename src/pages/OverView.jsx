import { useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { Products } from "../common/Products";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";

const OverView = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.auth);
  const GET_PRODUCTS = gql`
    query Query($userId: Int!) {
      transactionByUser(userId: $userId) {
        id
        product {
          title
          id
          price
          rent
          description
          rentType {
            id
            label
          }
          categories {
            id
            name
          }
        }
        type
      }
    }
  `;
  const { data } = useQuery(GET_PRODUCTS, {
    variables: { userId: id },
  });
  console.log({ data });
  const openTab = (tabId) => {
    setActiveTab(tabId);
  };
  const click = (item) => {
    navigate(`/edit/${item?.title}`, { state: { product: item } });
  };

  return (
    <div className="tab-container">
      <div className="tab-header row">
        <PrimaryButton
          label={"Bought"}
          type={"button"}
          onClick={() => openTab("tab1")}
          className={"col-3 border rounded "}
          customStyle={{
            backgroundColor: "white",
            color: "#8A2BE2",
            //   width: "10rem",
            padding: "0.6rem",
            border: "1px solid #8A2BE2",
          }}
        />
        <PrimaryButton
          label={"Sold"}
          type={"button"}
          onClick={() => openTab("tab2")}
          className={"col-3 border rounded "}
          customStyle={{
            backgroundColor: "white",
            color: "#8A2BE2",
            //   width: "10rem",
            padding: "0.6rem",
            border: "1px solid #8A2BE2",
          }}
        />
        <PrimaryButton
          label={"Borrowed"}
          type={"button"}
          onClick={() => openTab("tab3")}
          className={"col-3 border rounded "}
          customStyle={{
            backgroundColor: "white",
            color: "#8A2BE2",
            //   width: "10rem",
            padding: "0.6rem",
            border: "1px solid #8A2BE2",
          }}
        />
        <PrimaryButton
          label={"Lent"}
          type={"button"}
          onClick={() => openTab("tab4")}
          className={"col-3 border rounded "}
          customStyle={{
            backgroundColor: "white",
            color: "#8A2BE2",
            //   width: "10rem",
            padding: "0.6rem",
            border: "1px solid #8A2BE2",
          }}
        />
      </div>
      <div className=" w-25 mt-5 mx-auto">
        <div
          className="tab-content"
          style={{ display: activeTab === "tab1" ? "block" : "none" }}
        >
          {data?.transactionByUser?.filter((item) => item?.type === "Bought")
            ?.length > 0
            ? data?.transactionByUser
                ?.filter((item) => item?.type === "Bought")
                ?.map((product) => (
                  <Products
                    item={product?.product}
                    key={product?.product?.title}
                    click={click}
                    showInfo={false}
                  />
                ))
            : null}
        </div>

        <div
          className="tab-content"
          style={{ display: activeTab === "tab2" ? "block" : "none" }}
        >
          {data?.transactionByUser?.filter((item) => item?.type === "Sold")
            ?.length > 0
            ? data?.transactionByUser
                ?.filter((item) => item?.type === "Sold")
                ?.map((product) => (
                  <Products
                    item={product?.product}
                    key={product?.product?.title}
                    showInfo={false}
                    click={click}
                  />
                ))
            : null}
        </div>

        <div
          className="tab-content"
          style={{ display: activeTab === "tab3" ? "block" : "none" }}
        >
          {data?.transactionByUser?.filter((item) => item?.type === "Borrowed")
            ?.length > 0
            ? data?.transactionByUser
                ?.filter((item) => item?.type === "Borrowed")
                ?.map((product) => (
                  <Products
                    item={product?.product}
                    key={product?.product?.title}
                    showInfo={false}
                    click={click}
                  />
                ))
            : null}
        </div>
        <div
          className="tab-content"
          style={{ display: activeTab === "tab4" ? "block" : "none" }}
        >
          {data?.transactionByUser?.filter((item) => item?.type === "Lend")
            ?.length > 0
            ? data?.transactionByUser
                ?.filter((item) => item?.type === "Lend")
                ?.map((product) => (
                  <Products
                    item={product?.product}
                    key={product?.product?.title}
                    showInfo={false}
                    click={click}
                  />
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default OverView;
