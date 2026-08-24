import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const routes = {
  home: new URL("../dist/index.html", import.meta.url),
  quickbin: new URL("../dist/work/quickbin/index.html", import.meta.url),
  tonal: new URL("../dist/work/tonal-inference/index.html", import.meta.url),
  connectFour: new URL(
    "../dist/work/connect-four/index.html",
    import.meta.url,
  ),
};
const rawBasePath = process.env.SITE_BASE_PATH ?? "/";
const basePath =
  rawBasePath === "/"
    ? "/"
    : `/${rawBasePath.replace(/^\/+|\/+$/g, "")}/`;
const escapedBasePath = basePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function readRoute(route) {
  return readFile(route, "utf8");
}

test("prerenders the portfolio homepage without starter content", async () => {
  const html = await readRoute(routes.home);
  assert.match(html, /Zihao \(Jason\) Zhang/);
  assert.match(html, /Research Engineer/);
  assert.match(html, /After the first result/);
  assert.match(html, /Selected Work/);
  assert.match(html, /Five projects, one habit/);
  assert.match(html, /Building trustworthy evidence/);
  assert.match(html, /Better memory could not fix a lossy representation/);
  assert.match(
    html,
    new RegExp(`src="${escapedBasePath}headshot\\.jpg"`),
  );
  assert.doesNotMatch(html, /Portrait placeholder|Pending Jason's photo/);
  assert.doesNotMatch(
    html,
    /codex-preview|SkeletonPreview|react-loading-skeleton|vinext|wrangler/i,
  );
  assert.match(html, /show how it was tested/);
  assert.match(html, /narrow a claim than defend one/);
});

test("prerenders both deep case studies", async () => {
  const [quickbinHtml, tonalHtml] = await Promise.all([
    readRoute(routes.quickbin),
    readRoute(routes.tonal),
  ]);

  assert.match(quickbinHtml, /Five gates decide every merge/);
  assert.match(quickbinHtml, /Contamination held; the composite ranking changed/);
  assert.match(quickbinHtml, /shared-U2500 universe/);
  assert.match(quickbinHtml, /Candidate \/ AM1/);
  assert.match(quickbinHtml, /External community: N = 1/);
  assert.match(quickbinHtml, /Contamination fell in one CAMI II community too/);
  assert.doesNotMatch(quickbinHtml, /The same direction appeared/);
  assert.match(quickbinHtml, /no JGI code or data/);
  assert.match(quickbinHtml, /class="chapter-row"/);
  assert.match(
    quickbinHtml,
    new RegExp(`src="${escapedBasePath}quickbin/merge-decision\\.svg"`),
  );
  assert.match(
    quickbinHtml,
    new RegExp(
      `srcSet="${escapedBasePath}quickbin/heldout-contamination-mobile\\.svg"`,
    ),
  );
  assert.match(tonalHtml, /synthetic labeled accuracy, not real-MIDI accuracy/);
  assert.match(tonalHtml, /sensitivity grid of 54 conditions/);
  assert.match(
    tonalHtml,
    new RegExp(
      `src="${escapedBasePath}tonal/circle-of-fifths-ema-vs-srn\\.png"`,
    ),
  );
  assert.match(
    tonalHtml,
    new RegExp(`src="${escapedBasePath}tonal/gate-sensitivity-pareto\\.png"`),
  );
  assert.match(tonalHtml, /Dotted bars are narrative reference thresholds/);
  assert.match(tonalHtml, /Attribution and next question/);
});

test("prerenders the Connect Four evidence card", async () => {
  const html = await readRoute(routes.home);
  assert.match(html, /When the benchmark, not the agent, was the bug/);
  assert.match(html, /93\/100 on held-out seeds 40-139/);
  assert.match(html, /fixed (?:search )?depth(?: at)? 6/i);
  assert.match(html, /(?:unmodified|unchanged) 1001-rollout Monte Carlo baseline/i);
  assert.match(html, /The recovered source is not in a public repository yet/);
  assert.match(
    html,
    new RegExp(
      `src="${escapedBasePath}connect-four/final-evidence\\.svg"`,
    ),
  );
  assert.doesNotMatch(html, /benchmark-sequence\.svg/);
  assert.match(html, /class="card-detail-figure wide-card-visual"/);
  assert.match(
    html,
    new RegExp(`href="${escapedBasePath}work/connect-four/"`),
  );
});

test("prerenders the Connect Four case study from final evidence", async () => {
  const html = await readRoute(routes.connectFour);
  assert.match(html, /Rerunning an old Connect Four agent/);
  assert.match(html, /93\/100 held out/);
  assert.match(html, /Wilson 95% \[86\.3%, 96\.6%\]/);
  assert.match(html, /140\/140 outcomes matched/);
  assert.match(html, /unchanged 1001-rollout Monte Carlo baseline/);
  assert.match(html, /publication remains a separate decision/);
  assert.doesNotMatch(html, /32%|80%|39\/40|35\/40|27\/40|62\/100/);
  assert.match(
    html,
    new RegExp(
      `src="${escapedBasePath}connect-four/heldout-evidence\\.svg"`,
    ),
  );
  assert.match(
    html,
    new RegExp(
      `srcSet="${escapedBasePath}connect-four/heldout-evidence-mobile\\.svg"`,
    ),
  );
});

test("prerenders the approved contact and resume links", async () => {
  const html = await readRoute(routes.home);
  assert.match(html, /href="https:\/\/github\.com\/TacoRav4"/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/jasonzzh"/);
  assert.match(html, /href="mailto:jasonzhang5@ucmerced\.edu"/);
  assert.match(
    html,
    new RegExp(
      `href="${escapedBasePath}resume\\.pdf" download="Zihao_Jason_Zhang_Resume\\.pdf"`,
    ),
  );
  await access(new URL("../dist/resume.pdf", import.meta.url));
});

test("emits static assets and route-specific metadata", async () => {
  const [homeHtml, quickbinHtml, tonalHtml, connectFourHtml] = await Promise.all([
    readRoute(routes.home),
    readRoute(routes.quickbin),
    readRoute(routes.tonal),
    readRoute(routes.connectFour),
  ]);

  assert.match(
    homeHtml,
    new RegExp(
      `<script type="module" src="${escapedBasePath}assets/.+\\.js"></script>`,
    ),
  );
  assert.match(
    homeHtml,
    new RegExp(
      `<link rel="stylesheet" href="${escapedBasePath}assets/.+\\.css" />`,
    ),
  );
  assert.match(quickbinHtml, /<title>QuickBin \/ JGI Experience/);
  assert.match(tonalHtml, /<title>Tonal Inference Modeling/);
  assert.match(connectFourHtml, /<title>Connect Four Benchmark Audit/);

  for (const asset of [
    "headshot.jpg",
    "astar/path-comparison.svg",
    "connect-four/final-evidence.svg",
    "connect-four/heldout-evidence.svg",
    "connect-four/heldout-evidence-mobile.svg",
    "harmonic/temporal-sensitivity.png",
    "harmonic/surprisal-over-time.png",
    "quickbin/heldout-contamination.png",
    "quickbin/heldout-contamination-mobile.svg",
    "quickbin/heldout-dotplot.svg",
    "quickbin/heldout-dotplot-mobile.svg",
    "quickbin/merge-decision.svg",
    "tonal/circle-of-fifths-ema-vs-srn.png",
    "tonal/gate-sensitivity-pareto.png",
  ]) {
    await access(new URL(`../dist/${asset}`, import.meta.url));
  }
});
