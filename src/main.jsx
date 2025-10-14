import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails.jsx";
import WishList from "./pages/WishList.jsx";
import Layout from "./components/Layout.jsx";
import Account from "./pages/account.jsx";
import { Provider } from "react-redux";
import { store } from "./features/store.js";
import Search from "./pages/Search.jsx";
import HomePage from "./HomePage.jsx"
import ShoppingCart from "./components/ShoppingCart/ShoppingCart.jsx";
import Category from "./pages/Category.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <Search /> },
      { path: "/wishList", element: <WishList /> },
      { path: "/account", element: <Account /> },
      { path: "/movieDetails/:id", element: <MovieDetails /> },
      {path:"/shoppingCart", element:<ShoppingCart/>},
      {path: "/category", element:<Category/>},
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
