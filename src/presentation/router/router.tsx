import { createBrowserRouter, Navigate } from "react-router";
// import {
//   AssistantPage,
//   AudioToTextPage,
//   ImageGenerationPage,
//   ImageTunningPage,
//   OrthographyPage,
//   ProsConsPage,
//   ProsConsStreamPage,
//   TextToAudioPage,
//   TranslatePage,
// } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { OrthographyPage } from "../pages/OrthographyPage";
import { ProsConsPage } from "../pages/ProsConsPage";
import { ProsConsStreamPage } from "../pages/ProsConsStreamPage";
import { TranslatePage } from "../pages/TranslatePage";
import { TextToAudioPage } from "../pages/TextToAudioPage";
import { ImageGenerationPage } from "../pages/ImageGenerationPage";
import { ImageTunningPage } from "../pages/ImageTunningPage";
import { AudioToTextPage } from "../pages/AudioToTextPage";
import { AssistantPage } from "../pages/AssistantPage";

export const menuRoutes = [
  {
    to: "/orthography",
    icon: "fa-solid fa-spell-check",
    title: "Orthography",
    description: "Check orthography",
    component: <OrthographyPage />,
  },
  {
    to: "/pros-cons",
    icon: "fa-solid fa-code-compare",
    title: "Pros & Cons",
    description: "Compare pros and cons",
    component: <ProsConsPage />,
  },
  {
    to: "/pros-cons-stream",
    icon: "fa-solid fa-water",
    title: "Pros cons stream",
    description: "Stream message",
    component: <ProsConsStreamPage />,
  },
  {
    to: "/translate",
    icon: "fa-solid fa-language",
    title: "Translate",
    description: "Text to another language",
    component: <TranslatePage />,
  },
  {
    to: "/text-to-audio",
    icon: "fa-solid fa-podcast",
    title: "Text to audio",
    description: "Convert text to audio",
    component: <TextToAudioPage />,
  },
  {
    to: "/image-generation",
    icon: "fa-solid fa-image",
    title: "Images",
    description: "Generate images",
    component: <ImageGenerationPage />,
  },
  {
    to: "/image-tunning",
    icon: "fa-solid fa-wand-magic",
    title: "Edit images",
    description: "Continuous generation",
    component: <ImageTunningPage />,
  },
  {
    to: "/audio-to-text",
    icon: "fa-solid fa-comment-dots",
    title: "Audio to text",
    description: "Convert audio to text",
    component: <AudioToTextPage />,
  },
  {
    to: "/assistant",
    icon: "fa-solid fa-user",
    title: "Assistant",
    description: "Assistant information",
    component: <AssistantPage />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      { path: "", element: <Navigate to={menuRoutes[0].to} /> },
    ],
  },
]);
