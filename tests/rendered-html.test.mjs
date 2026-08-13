import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const routes = {
  home: new URL("../dist/index.html", import.meta.url),
  quickbin: new URL("../dist/work/quickbin/index.html", import.meta.url),
  tonal: new URL("../dist/work/tonal-inference/index.html", import.meta.url),
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
  assert.match(html, /05 \/ Selected work/);
  assert.match(html, /After the first result/);
  assert.match(html, /The problems range from genome binning and pathfinding/);
  assert.match(html, /Building trustworthy evidence/);
  assert.match(html, /When better memory cannot fix/);
  assert.match(
    html,
    new RegExp(`src="${escapedBasePath}headshot\\.png"`),
  );
  assert.doesNotMatch(html, /Portrait placeholder|Pending Jason's photo/);
  assert.doesNotMatch(
    html,
    /codex-preview|SkeletonPreview|react-loading-skeleton|vinext|wrangler/i,
  );
  assert.match(html, /what improved, where it held/);
  assert.match(html, /claims calibrated to the evidence/);
});

test("prerenders both deep case studies", async () => {
  const [quickbinHtml, tonalHtml] = await Promise.all([
    readRoute(routes.quickbin),
    readRoute(routes.tonal),
  ]);

  assert.match(quickbinHtml, /Split genomes before examples/);
  assert.match(quickbinHtml, /Contamination held; the composite ranking changed/);
  assert.match(quickbinHtml, /shared-U2500 universe/);
  assert.match(quickbinHtml, /Candidate \/ AM1/);
  assert.match(quickbinHtml, /External community: N = 1/);
  assert.match(quickbinHtml, /No JGI code, data, model/);
  assert.match(tonalHtml, /synthetic labeled accuracy, not real-MIDI accuracy/);
  assert.match(tonalHtml, /Fifty-four conditions mapped a tradeoff frontier/);
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
  assert.match(tonalHtml, /Contribution and AI assistance/);
});

test("prerenders the Connect Four evidence card", async () => {
  const html = await readRoute(routes.home);
  assert.match(html, /When the benchmark, not the agent, was the bug/);
  assert.match(html, /93\/100 on held-out seeds 40-139/);
  assert.match(html, /fixed search depth 6/i);
  assert.match(html, /unmodified 1001-rollout Monte Carlo baseline/i);
  assert.match(html, /The recovered source is not in a public repository yet/);
  assert.match(
    html,
    new RegExp(
      `src="${escapedBasePath}connect-four/benchmark-sequence\\.svg"`,
    ),
  );
  assert.match(html, /class="card-detail-figure wide-card-visual"/);
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
  const [homeHtml, quickbinHtml, tonalHtml] = await Promise.all([
    readRoute(routes.home),
    readRoute(routes.quickbin),
    readRoute(routes.tonal),
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

  for (const asset of [
    "headshot.png",
    "astar/path-comparison.svg",
    "connect-four/benchmark-sequence.svg",
    "harmonic/surprisal-over-time.png",
    "quickbin/heldout-contamination.png",
    "quickbin/merge-decision.svg",
    "tonal/circle-of-fifths-ema-vs-srn.png",
    "tonal/gate-sensitivity-pareto.png",
  ]) {
    await access(new URL(`../dist/${asset}`, import.meta.url));
  }
});
