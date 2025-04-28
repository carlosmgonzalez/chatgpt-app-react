import { createBrowserRouter, Navigate } from "react-router";
import {
  AssistantPage,
  AudioToTextPage,
  ImageGenerationPage,
  OrthographyPage,
  ProsConsPage,
  ProsConsStreamPage,
  TextToAudioPage,
  TranslatePage,
} from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";

export const menuRoutes = [
  {
    to: "/assistant",
    icon: "fa-solid fa-user",
    title: "Assistant",
    description: "Assistant information",
    component: <AssistantPage />,
  },
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
    to: "/audio-to-text",
    icon: "fa-solid fa-comment-dots",
    title: "Audio to text",
    description: "Convert audio to text",
    component: <AudioToTextPage />,
  },
  {
    to: "/image-generation",
    icon: "fa-solid fa-image",
    title: "Images",
    description: "Generate images",
    component: <ImageGenerationPage />,
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
