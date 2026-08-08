import RootLayout, { metadata as siteMetadata } from "../app/layout";
import Home from "../app/page";
import QuickBinCaseStudy from "../app/work/quickbin/page";
import TonalInferenceCaseStudy from "../app/work/tonal-inference/page";

type RouteDefinition = {
  pathname: string;
  title: string;
  description: string;
  Page: () => React.JSX.Element;
};

export const staticRoutes: RouteDefinition[] = [
  {
    pathname: "/",
    title: siteMetadata.title,
    description: siteMetadata.description,
    Page: Home,
  },
  {
    pathname: "/work/quickbin/",
    title: "QuickBin / JGI Experience — Zihao (Jason) Zhang",
    description:
      "A case study in leakage-safe benchmark design, internal model tradeoffs, and an external ordering reversal.",
    Page: QuickBinCaseStudy,
  },
  {
    pathname: "/work/tonal-inference/",
    title: "Tonal Inference Modeling — Zihao (Jason) Zhang",
    description:
      "A case study in learned recurrence, real-MIDI transfer failure, and representation diagnosis.",
    Page: TonalInferenceCaseStudy,
  },
];

function stripBasePath(pathname: string) {
  const basePath = import.meta.env.BASE_URL;
  const withoutBase =
    basePath !== "/" && pathname.startsWith(basePath)
      ? `/${pathname.slice(basePath.length)}`
      : pathname;
  return withoutBase === "/" ? "/" : `${withoutBase.replace(/\/+$/, "")}/`;
}

export function routeForPath(pathname: string) {
  const normalizedPath = stripBasePath(pathname);
  return staticRoutes.find((route) => route.pathname === normalizedPath);
}

export function PortfolioApp({ pathname }: { pathname: string }) {
  const route = routeForPath(pathname) ?? staticRoutes[0];
  return (
    <RootLayout>
      <route.Page />
    </RootLayout>
  );
}
