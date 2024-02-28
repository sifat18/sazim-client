import { useState } from "react";
import { Products } from "../common/Products";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION_PRODUCTS } from "./apiHelper";
import TabButton from "../common/TabButton";

const OverView = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.auth);

  const { data } = useQuery(GET_TRANSACTION_PRODUCTS, {
    variables: { userId: id },
  });
  const openTab = (tabId) => {
    setActiveTab(tabId);
  };
  const click = (item) => {
    navigate(`/edit/${item?.title}`, { state: { product: item } });
  };

  return (
    <div>
      <div className="row w-100 ">
        <TabButton label="Bought" onClick={() => openTab("tab1")} />
        <TabButton label="Sold" onClick={() => openTab("tab2")} />
        <TabButton label="Borrowed" onClick={() => openTab("tab3")} />
        <TabButton label="Lent" onClick={() => openTab("tab4")} />
      </div>
      <div className=" w-25 mt-5 mx-auto">
        {/* tab-1 */}
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
        {/* tab-2 */}

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
        {/* tab-3 */}

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
        {/* tab-4 */}

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
