import { configureRouter } from "./location.js";

export const ROUTES = [
  { name: "home", path: "/" },
  {
    name: "image",
    path: "/image/${imageId}",
  },
];

export const goTo = configureRouter(ROUTES)(
  (routeName, parameters) => {},
  () => {}
);
