import  { useState } from 'react';
import PrimaryButton from '../common/PrimaryButton';
import { Products } from '../common/Products';
import { useNavigate } from 'react-router-dom';

const OverView = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const navigate = useNavigate();

  const openTab = (tabId) => {
    setActiveTab(tabId);
  };
  const click=(item)=>{
    
    navigate(`/edit/${item?.title}`,{ state: { product: item }})
  }
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
])
  return (
    <div className="tab-container">
      <div className="tab-header row">
      <PrimaryButton
                label={"Bought"}
                type={"button"}
                onClick={() => openTab('tab1')}
                className={"col-3 border rounded "}
                customStyle={{
                  backgroundColor: "white",
                  color: "#8A2BE2",
                //   width: "10rem",
                  padding: "0.6rem",
                  border:"1px solid #8A2BE2"
                }}
              />
      <PrimaryButton
                label={"Sold"}
                type={"button"}
                onClick={() => openTab('tab2')}
                className={"col-3 border rounded "}
                customStyle={{
                    backgroundColor: "white",
                    color: "#8A2BE2",
                //   width: "10rem",
                  padding: "0.6rem",
                  border:"1px solid #8A2BE2"
                }}
              />
      <PrimaryButton
                label={"Borrowed"}
                type={"button"}
                onClick={() => openTab('tab3')}
                className={"col-3 border rounded "}
                customStyle={{
                    backgroundColor: "white",
                    color: "#8A2BE2",
                //   width: "10rem",
                  padding: "0.6rem",
                  border:"1px solid #8A2BE2"
                }}
              />
      <PrimaryButton
                label={"Lent"}
                type={"button"}
                onClick={() => openTab('tab4')}
                className={"col-3 border rounded "}
                customStyle={{
                    backgroundColor: "white",
                    color: "#8A2BE2",
                //   width: "10rem",
                  padding: "0.6rem",
                  border:"1px solid #8A2BE2"
                }}
              />
        {/* <button onClick={() => openTab('tab1')}>Bought</button> */}
        {/* <button onClick={() => openTab('tab2')}>Sold</button> */}
        {/* <button onClick={() => openTab('tab3')}>Borrowed</button> */}
        {/* <button onClick={() => openTab('tab4')}>Lent</button> */}
      </div>
<div className=" w-25 mt-5 mx-auto">
      <div className="tab-content" style={{ display: activeTab === 'tab1' ? 'block' : 'none' }}>
      {products?.length > 0
          ? products?.map((product) => (
              <Products item={product} key={product?.title} click={click}/>
            ))
          : null}
      </div>

      <div className="tab-content" style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}>
      {products?.length > 0
          ? products?.map((product) => (
              <Products item={product} key={product?.title} click={click}/>
            ))
          : null}
      </div>

      <div className="tab-content" style={{ display: activeTab === 'tab3' ? 'block' : 'none' }}>
      {products?.length > 0
          ? products?.map((product) => (
              <Products item={product} key={product?.title} click={click}/>
            ))
          : null}
      </div>
      <div className="tab-content" style={{ display: activeTab === 'tab4' ? 'block' : 'none' }}>
      {products?.length > 0
          ? products?.map((product) => (
              <Products item={product} key={product?.title} click={click} />
            ))
          : null}
      </div>
    </div>
    </div>
  );
};

export default OverView;
