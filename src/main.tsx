import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./presentation/router/router";
import { SidebarProvider } from "./components/ui/sidebar";

const root = document.getElementById("root");

createRoot(root!).render(
  <SidebarProvider>
    <RouterProvider router={router} />
  </SidebarProvider>
);
