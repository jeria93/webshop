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

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <Search /> },
      { path: "/wishList", element: <WishList /> },
      { path: "/account", element: <Account /> },
      { path: "/movieDetails", element: <MovieDetails /> },
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
