import Admin from "./pages/Admin";
import {ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, TVOROG_ROUTE, ADDJOKE_ROUTE, JOKEDETAILS_ROUTE, JOKES_ROUTE} from "./utils/consts";
import Basket from "./pages/Basket";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Tvorog from "./pages/Tvorog";
import JokeDetails from "./pages/JokeDetails";
import AddJoke from "./pages/AddJoke";
import Jokes from "./pages/Jokes";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
    
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:JOKES_ROUTE,
        Component: Jokes
    },
    {
        path:ADDJOKE_ROUTE,
        Component: AddJoke
    },
    {
        path:JOKEDETAILS_ROUTE,
        Component: JokeDetails
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: TVOROG_ROUTE,
        Component: Tvorog
    }

]