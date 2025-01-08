import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover";
import orderCoverImg from "../../assets/shop/order.jpg";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useMenu from "../../Hooks/useMenu";
import FoodCard from "./FoodCard";
import OrderTabShare from "./OrderTabShare";
import { useParams } from "react-router-dom";

const Order = () => {

  const categories =['salad','pizza','soup','dessert','drinks']
  const {category} = useParams()
  const initialIndex= categories.indexOf(category)

    const [tabindex,setTabindex]= useState(initialIndex)
    const [menu]= useMenu()
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    const drinks = menu.filter(item => item.category === 'drinks')

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Order Food</title>
      </Helmet>
      <Cover img={orderCoverImg} title="Order Food"></Cover>
     <div className="text-center">
     <Tabs defaultIndex={tabindex} onSelect={(index) => setTabindex(index)}>
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drink</Tab>
         
        </TabList>

        <TabPanel >
          {/* map kore daynamic card dekhanor jonn */}
         <OrderTabShare item={salad}></OrderTabShare>
        </TabPanel>
        <TabPanel >
          {/* map kore daynamic card dekhanor jonn */}
         <OrderTabShare item={pizza}></OrderTabShare>
        </TabPanel>
        <TabPanel >
          {/* map kore daynamic card dekhanor jonn */}
         <OrderTabShare item={soup}></OrderTabShare>
        </TabPanel>
        <TabPanel >
          {/* map kore daynamic card dekhanor jonn */}
         <OrderTabShare item={dessert}></OrderTabShare>
        </TabPanel>
        <TabPanel >
          {/* map kore daynamic card dekhanor jonn */}
         <OrderTabShare item={drinks}></OrderTabShare>
        </TabPanel>
        
      </Tabs>
     </div>
    </div>
  );
};

export default Order;
