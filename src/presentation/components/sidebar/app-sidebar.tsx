import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "../../../components/ui/sidebar";

import { NavLink, useLocation } from "react-router";
import {
  User,
  BookMarked,
  Scale,
  Languages,
  AudioLines,
  FileVolume,
  ImagePlus,
  ChartPie,
} from "lucide-react";

const items = [
  {
    title: "Assistant",
    url: "/assistant",
    icon: User,
  },
  {
    title: "Orthography",
    url: "/orthography",
    icon: BookMarked,
  },
  {
    title: "Pros and cons",
    url: "/pros-cons",
    icon: ChartPie,
  },
  {
    title: "Pros and cons stream",
    url: "/pros-cons-stream",
    icon: Scale,
  },
  {
    title: "Translate",
    url: "/translate",
    icon: Languages,
  },
  {
    title: "Text to audio",
    url: "/text-to-audio",
    icon: AudioLines,
  },
  {
    title: "Audio to text",
    url: "/audio-to-text",
    icon: FileVolume,
  },
  {
    title: "Images",
    url: "/image-generation",
    icon: ImagePlus,
  },
];

export const AppSidebar = () => {
  const { pathname } = useLocation();
  const { setOpen, setOpenMobile } = useSidebar();

  const closeSidemenu = () => {
    setOpen(false);
    setOpenMobile(false);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="font-bold text-2xl px-3">ChatGPT</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    onClick={closeSidemenu}
                    to={item.url}
                    className={`
                      flex flex-row gap-1 mb-1 hover:bg-neutral-300/50 px-3 py-2 rounded-lg
                      ${pathname === item.url && "bg-neutral-300/50"}`}
                  >
                    <item.icon size={22} />
                    <span className="text-base font-semibold">
                      {item.title}
                    </span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
