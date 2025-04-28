import { Outlet } from "react-router";
import { useSidebar } from "../../components/ui/sidebar";
import { AppSidebar } from "../components/sidebar/app-sidebar";
import { PanelRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const DashboardLayout = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <AppSidebar />
      <main className="h-full w-full">
        <div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-neutral-200/70 mt-1 ml-1"
          >
            <PanelRight size={20} />
          </button>
        </div>
        <Separator />
        <div className="w-full h-[calc(100vh-50px)] px-5">
          <Outlet />
        </div>
      </main>
    </>
  );
};
