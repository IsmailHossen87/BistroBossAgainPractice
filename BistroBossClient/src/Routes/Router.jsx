import {createBrowserRouter,} from "react-router-dom";
import MainlayOut from "../MainLayOut/MainlayOut";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Authentication/Login";
import SignUp from "../Authentication/SignUp";

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
    }
])
export default Router;