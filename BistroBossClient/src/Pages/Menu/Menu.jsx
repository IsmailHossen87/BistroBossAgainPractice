import React from 'react';
import { Helmet } from 'react-helmet-async';
import menuImg from '../../assets/menu/menu-bg.jpg'
import useMenu from '../../Hooks/useMenu';
import SectionTitle from '../../Shared/SectionTitle';
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import soupImg from '../../assets/menu/soup-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import MenuCategory from './MenuCategory';
import Cover from '../../Shared/Cover';

const Menu = () => {
    const [menu]= useMenu()
    const offered = menu.filter(item => item.category === 'offered')
    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const soup = menu.filter(item => item.category === 'soup')
    return (
        <div>
            <Helmet>
                <title>BistroBoss  Menu</title>
            </Helmet>
            <Cover img={menuImg} title={'Our Menu'}></Cover>
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
            {/* offered menu items */}


            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} title="dessert" img={dessertImg}></MenuCategory>
            <MenuCategory items={pizza} title={"pizza"} img={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title={"salad"} img={saladImg}></MenuCategory>
            <MenuCategory items={soup} title={"soup"} img={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;