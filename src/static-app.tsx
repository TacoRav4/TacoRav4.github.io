import RootLayout, { metadata as siteMetadata } from "../app/layout";
import Home from "../app/page";
import QuickBinCaseStudy from "../app/work/quickbin/page";
import TonalInferenceCaseStudy from "../app/work/tonal-inference/page";
import ConnectFourCaseStudy from "../app/work/connect-four/page";
import AStarCaseStudy from "../app/work/astar/page";
import HarmonicSurprisalCaseStudy from "../app/work/harmonic-surprisal/page";
import StructuredReviewLabCaseStudy from "../app/work/structured-review-lab/page";

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
    title: "QuickBin / JGI Experience: Zihao (Jason) Zhang",
    description:
      "Retraining QuickBin for PacBio HiFi under a leakage-safe split, and the external test that reordered the ranking.",
    Page: QuickBinCaseStudy,
  },
  {
    pathname: "/work/tonal-inference/",
    title: "Tonal Inference Modeling: Zihao (Jason) Zhang",
    description:
      "A learned memory beat the baseline on synthetic data. Real MIDI then exposed the representation underneath.",
    Page: TonalInferenceCaseStudy,
  },
  {
    pathname: "/work/connect-four/",
    title: "Connect Four Benchmark Audit: Zihao (Jason) Zhang",
    description:
      "Fixing the benchmark before trusting the agent: a frozen holdout, reproduced game-for-game on a second machine.",
    Page: ConnectFourCaseStudy,
  },
  {
    pathname: "/work/astar/",
    title: "A* Terrain Pathfinding: Zihao (Jason) Zhang",
    description:
      "Terrain-aware heuristics preserved optimal path cost. Weighted A* reduced expansions with a measured path-cost tradeoff.",
    Page: AStarCaseStudy,
  },
  {
    pathname: "/work/harmonic-surprisal/",
    title: "Harmonic Surprisal Across Popular Music: Zihao (Jason) Zhang",
    description:
      "A reconstructed R analysis tested an inverted-U hypothesis. Weighting by decade sample size changed the interpretation.",
    Page: HarmonicSurprisalCaseStudy,
  },
  {
    pathname: "/work/structured-review-lab/",
    title: "Structured Review Lab: Zihao (Jason) Zhang",
    description:
      "A local-first React/TypeScript and FastAPI/Pydantic workflow validates model output against a fixed contract and checks evidence before it reaches the result view.",
    Page: StructuredReviewLabCaseStudy,
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
