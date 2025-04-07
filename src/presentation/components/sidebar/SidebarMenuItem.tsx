import { NavLink } from "react-router";

interface Option {
  to: string;
  icon: string;
  title: string;
  description: string;
}

export const SidebarMenuItem = ({ option }: { option: Option }) => {
  return (
    <NavLink
      key={option.to}
      to={option.to}
      className={({ isActive }) =>
        isActive
          ? "flex justify-center items-center bg-gray-800 rounded-md p-2 transition-colors"
          : "flex justify-center items-center  hover:bg-gray-800 rounded-md p-2 transition-colors"
      }
    >
      <i className={`${option.icon} text-2xl mr-4 text-shadow-neutral-700`}></i>
      <div className="flex flex-col flex-1">
        <span className="text-white text-lg font-semibold">{option.title}</span>
        <span className="text-gray-400 text-sm">{option.description}</span>
      </div>
    </NavLink>
  );
};
