import React, { useState, useEffect } from "react";
import FnbContext from "./FnbContext";
import axios from "axios";

const state = {
  name: "rashid",
  age: "23",
};

const FnbState = (props) => {
  const [beveragesItem, setBeveragesItem] = useState([]);
  const [beveragesCategory, setBeveragesCategory] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [merchandiseCategory, setMerchandiseCategory] = useState([]);
  const [merchandiseItem, setMerchandiseItem] = useState([]);

  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [qty1, setQty] = useState([]);

  //on add function

  const onAdd = (item, id) => {
    const exist = cartItems.find((series) => series.itemid === item.itemid);
    if (exist) {
      setCartItems(
        cartItems.map((series) =>
          series.itemid === item.id ? { ...exist, qty: exist.qty + 1 } : series
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, qty: 1 }]);
    }

    setQty(beveragesItem);
  };

  const fnbBeerData = async () => {
    let result = await axios
      .get("https://moneysaverz.com:8080/front/v1/common/get-restaurant-menus")
      .then((res) => {
        console.log(res.data.response);
        setBeveragesItem(
          res.data.response.result[0].items.filter(
            (item) =>
              item.item_categoryid === "69934" ||
              item.item_categoryid === "69932" ||
              item.item_categoryid === "69907" ||
              item.item_categoryid === "69909"
          )
        );
        setBeveragesCategory(
          res.data.response.result[0].categories.filter(
            (item) =>
              item.categoryname === "Kombucha" ||
              item.categoryname === "Mocktail" ||
              item.categoryname === "Soda" ||
              item.categoryname === "Milkshake" ||
              item.categoryname === "Iced Tea"
          )
        );
        setFoodCategory(
          res.data.response.result[0].categories.filter(
            (item) =>
              item.categoryname === "Breakfast" ||
              item.categoryname === "Starters" ||
              item.categoryname === "Salads" ||
              item.categoryname === "Pizza" ||
              item.categoryname === "Main Course" ||
              item.categoryname === "Desserts"
          )
        );
        setFoodItem(
          res.data.response.result[0].items.filter(
            (item) =>
              item.item_categoryid === "69917" ||
              item.item_categoryid === "69916" ||
              item.item_categoryid === "69915" ||
              item.item_categoryid === "69918" ||
              item.item_categoryid === "69914"
          )
        );
        setMerchandiseCategory(
          res.data.response.result[0].categories.filter(
            (item) => item.categoryname === "Merchandise"
          )
        );
        setMerchandiseItem(
          res.data.response.result[0].items.filter(
            (item) => item.item_categoryid === "69911"
          )
        );
      })
      .catch((err) => console.log(err));
    if (result) {
      alert("hi");
      console.log(result);
    }
  };
  useEffect(() => {
    fnbBeerData();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <FnbContext.Provider
        value={{
          beveragesItem,
          onAdd,
          cartItems,
          beveragesCategory,
          qty1,
          foodCategory,
          foodItem,
          merchandiseCategory,
          merchandiseItem,
        }}
      >
        {props.children}
      </FnbContext.Provider>
    </>
  );
};

export default FnbState;
