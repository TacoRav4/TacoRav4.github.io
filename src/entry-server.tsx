import { renderToString } from "react-dom/server";
import { PortfolioApp, routeForPath, staticRoutes } from "./static-app";

export { staticRoutes };

export function renderPage(pathname: string) {
  const route = routeForPath(pathname) ?? staticRoutes[0];
  return {
    title: route.title,
    description: route.description,
    html: renderToString(<PortfolioApp pathname={pathname} />),
  };
}
