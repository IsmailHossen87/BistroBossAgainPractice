import React from "react";
import FoodCard from "./FoodCard";

const OrderTabShare = ({ item }) => {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {item.map((item) => (
        <FoodCard item={item}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTabShare;
