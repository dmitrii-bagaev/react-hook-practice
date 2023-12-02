import { ReactElement } from "react";
import { HomeWork1 } from "./pages/HomeWork1/HomeWork1";
import { HomeWork2 } from "./pages/HomeWork2/HomeWork2";
import {HomeWork3} from "./pages/HomeWork3/HomeWork3";

interface IRoute {
  title: string;
  description?: string;
  element: ReactElement;
}

export const routesConfig: Record<string, IRoute> = {
  "/homework1": {
    title: "Домашнее задание №1",
    element: <HomeWork1 />,
  },
  "/homework2": {
    title: "Домашнее задание №2",
    element: <HomeWork2 />,
  },
  "/homework3": {
    title: "Домашнее задание №3",
    element: <HomeWork3 />,
  },
};

export const routes = Object.keys(routesConfig);
