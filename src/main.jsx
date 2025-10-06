import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails.jsx/";
import WishList from "./pages/WishList.jsx";

const router = createHashRouter([
  { path: "/", element: <App /> },
  { path: "/movieDetails", element: <MovieDetails /> },
  { path: "/wishList", element: <WishList /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
