import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./presentation/router/router";

const root = document.getElementById("root");

createRoot(root!).render(<RouterProvider router={router} />);
