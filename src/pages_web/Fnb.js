import React, { useState, useEffect, useEffect } from "react";
import axios from "axios";

function Fnb() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // here Api call for Home page
    let result = await axios(
      "https://qle1yy2ydc.execute-api.ap-southeast-1.amazonaws.com/V1/mapped_restaurant_menus"
    );
    if (result) {
      result = await result.json();
    }
  };

  return <div>Fnb</div>;
}

export default Fnb;
