import {createBrowserRouter,} from "react-router-dom";
import MainlayOut from "../MainLayOut/MainlayOut";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";
import DeshBoard from "../DeshBoard/DeshBoard";
import Cart from "../DeshBoard/Cart";
import AllUser from "../DeshBoard/AllUser";
import AddItems from "../DeshBoard/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../DeshBoard/ManageItems";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<MainlayOut></MainlayOut>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/menu',
                element:<Menu></Menu>
            },
            {
                path:'/order/:category',
                element:<Order></Order>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signUp',
                element:<SignUp></SignUp>
            },
        ]
    },
    {
        path:'dashboard',
        element:<DeshBoard></DeshBoard>,
        children:[
            {
                path:'card',
                element:<Cart></Cart>
            },
            {
                path:'add-items',
                element:<AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path:'manage-items',
                element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            // admin
            {
                path:'alluser',
                element:<AdminRoute><AllUser></AllUser></AdminRoute>
            },
        ]
    }

])
export default Router;