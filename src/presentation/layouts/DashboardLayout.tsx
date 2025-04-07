import { Outlet } from "react-router";
import { SidebarMenuItem } from "../components/sidebar/SidebarMenuItem";
import { menuRoutes } from "../router/router";

export const DashboardLayout = () => {
  return (
    <main className="flex flex-row sm:m-2 sm:gap-2">
      <nav className="hidden sm:flex flex-col w-[370px] min-h-[calc(100vh-3.0rem)] bg-neutral-800 bg-opacity-10 p-5 rounded-md">
        <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">ChatGPT.</h1>
        <span className="text-xl">Welcome</span>

        <div className="border-gray-700 border my-3" />

        {menuRoutes.map((option) => (
          <SidebarMenuItem option={option} key={option.to} />
        ))}
      </nav>

      <section className="m-2 sm:mx-0 sm:my-0 flex flex-col w-full h-[calc(100vh-50px)] bg-neutral-800 bg-opacity-10 p-2 rounded-md">
        <div className="flex flex-row h-full">
          <div className="flex flex-col flex-auto h-full p-1">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};
