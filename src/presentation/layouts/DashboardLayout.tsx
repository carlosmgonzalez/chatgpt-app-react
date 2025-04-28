import { Outlet, useLocation } from "react-router";
import { useSidebar } from "../../components/ui/sidebar";
import { AppSidebar } from "../components/sidebar/app-sidebar";
import { PanelRight, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAssistantStore } from "@/core/store/use-assitant.store";

export const DashboardLayout = () => {
  const { toggleSidebar } = useSidebar();

  const { pathname } = useLocation();
  const { setState, createThreadId } = useAssistantStore();

  const handleNewMessage = () => {
    setState({ threadId: null, messages: [] });
    createThreadId();
  };

  return (
    <>
      <AppSidebar />
      <main className="h-full w-full">
        <div className="flex flex-row justify-between p-1">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-neutral-200/70"
          >
            <PanelRight size={20} />
          </button>
          {pathname === "/assistant" && (
            <button
              onClick={handleNewMessage}
              type="button"
              className="p-2 rounded-md hover:bg-neutral-200/70"
            >
              <SquarePen size={20} />
            </button>
          )}
        </div>
        <Separator />
        <div className="w-full h-[calc(100vh-50px)]">
          <Outlet />
        </div>
      </main>
    </>
  );
};
