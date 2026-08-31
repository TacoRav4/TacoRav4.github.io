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
  astar: new URL("../dist/work/astar/index.html", import.meta.url),
  harmonic: new URL(
    "../dist/work/harmonic-surprisal/index.html",
    import.meta.url,
  ),
  structuredReview: new URL(
    "../dist/work/structured-review-lab/index.html",
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
  assert.match(html, /Six projects, one habit/);
  assert.match(html, /Adapting QuickBin for PacBio metagenome binning/);
  assert.match(
    html,
    /A document-review workflow that checks its own evidence/,
  );
  assert.match(html, /Terrain-aware pathfinding with A\* heuristics/);
  assert.match(html, /Modeling how tonal center inference updates over time/);
  assert.match(html, /Harmonic surprisal across a century of popular music/);
  assert.match(html, /Benchmarking an old Connect Four agent/);
  assert.match(
    html,
    new RegExp(`href="${escapedBasePath}work/astar/"`),
  );
  assert.match(
    html,
    new RegExp(`href="${escapedBasePath}work/harmonic-surprisal/"`),
  );
  assert.match(
    html,
    new RegExp(`href="${escapedBasePath}work/structured-review-lab/"`),
  );
  assert.match(
    html,
    new RegExp(`src="${escapedBasePath}structured-review/review-flow\\.svg"`),
  );
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
  assert.match(html, /introduce the system or question/);
  assert.match(
    html,
    /Retraining lowered contamination internally, but the external ranking did not hold\./,
  );
  assert.match(html, /Fewer expansions came with a measured path-cost tradeoff\./);
  assert.match(
    html,
    /The apparent inverted-U did not survive weighting for unequal decade samples\./,
  );
  assert.match(html, /narrow a claim than defend one/);
});

test("prerenders both deep case studies", async () => {
  const [quickbinHtml, tonalHtml] = await Promise.all([
    readRoute(routes.quickbin),
    readRoute(routes.tonal),
  ]);

  assert.match(quickbinHtml, /Five gates decide every merge/);
  assert.match(
    quickbinHtml,
    /<h1>Building trustworthy evidence for neural metagenome binning<\/h1>/,
  );
  assert.match(
    quickbinHtml,
    /The Total Score leader changed: AM1 internally, Shipping on CAMI II/,
  );
  assert.match(quickbinHtml, /shared-U2500 universe/);
  assert.match(quickbinHtml, /Internal and external Total Score rankings/);
  assert.match(quickbinHtml, /Shipping: Rank 3 → Rank 1 on CAMI II/);
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
  assert.match(
    tonalHtml,
    /<h1>Better memory could not fix a lossy representation<\/h1>/,
  );
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

test("prerenders the A-star case study", async () => {
  const html = await readRoute(routes.astar);
  assert.match(html, /Terrain-aware pathfinding with A\* heuristics/);
  assert.match(html, /81\.25% fewer/);
  assert.match(html, /98\.57% fewer/);
  assert.match(html, /1\.83% higher/);
  assert.match(
    html,
    /The course material and clean reconstruction stay separate/,
  );
  assert.match(html, /A code-release page needs a separate license decision/);
  assert.match(
    html,
    new RegExp(
      "src=\"" + escapedBasePath + "astar/path-comparison\\.svg\"",
    ),
  );
});

test("prerenders the harmonic surprisal case study", async () => {
  const html = await readRoute(routes.harmonic);
  assert.match(html, /Harmonic surprisal across a century of popular music/);
  assert.match(html, /667,858 rows/);
  assert.match(html, /277,925 songs/);
  assert.match(html, /Weighting changed the temporal conclusion/);
  assert.match(html, /Neither weighted model retained an in-range inverted-U/);
  assert.match(html, /Code terms and dataset terms are separate/);
  assert.match(html, /Apache-2\.0/);
  assert.match(html, /CC BY-NC-4\.0/);
  assert.match(
    html,
    new RegExp(
      "src=\"" +
        escapedBasePath +
        "harmonic/temporal-sensitivity\\.png\"",
    ),
  );
  assert.match(html, /raw-data download/);
});

test("prerenders the Structured Review Lab case study", async () => {
  const html = await readRoute(routes.structuredReview);
  assert.match(html, /A document-review workflow that can refuse to guess/);
  assert.match(html, /exact-substring evidence/i);
  assert.match(html, /Human review required/);
  assert.match(html, /open-question synthetic document/);
  assert.match(html, /20 synthetic fixtures/);
  assert.match(html, /Two synthetic fixtures/);
  assert.match(
    html,
    new RegExp(
      `src="${escapedBasePath}structured-review/review-flow\\.svg"`,
    ),
  );
  assert.match(
    html,
    new RegExp(
      `srcSet="${escapedBasePath}structured-review/review-flow-mobile\\.svg"`,
    ),
  );
  assert.match(
    html,
    new RegExp(
      `srcSet="${escapedBasePath}structured-review/normal-result-mobile\\.png"`,
    ),
  );
  assert.match(
    html,
    new RegExp(
      `src="${escapedBasePath}structured-review/question-review\\.png"`,
    ),
  );
  assert.match(html, /not model-accuracy results/);
  assert.match(html, /cannot establish broad accuracy/);
  assert.doesNotMatch(html, /github\.com\/.*structured-review/i);
});

test("prerenders the Connect Four evidence card", async () => {
  const html = await readRoute(routes.home);
  assert.match(html, /Benchmarking an old Connect Four agent/);
  assert.match(html, /The benchmark, not the agent, was the bug/);
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
  const [
    homeHtml,
    quickbinHtml,
    tonalHtml,
    connectFourHtml,
    astarHtml,
    harmonicHtml,
    structuredReviewHtml,
  ] = await Promise.all([
    readRoute(routes.home),
    readRoute(routes.quickbin),
    readRoute(routes.tonal),
    readRoute(routes.connectFour),
    readRoute(routes.astar),
    readRoute(routes.harmonic),
    readRoute(routes.structuredReview),
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
  assert.match(astarHtml, /<title>A\* Terrain Pathfinding/);
  assert.match(
    harmonicHtml,
    /<title>Harmonic Surprisal Across Popular Music/,
  );
  assert.match(
    structuredReviewHtml,
    /<title>Structured Review Lab/,
  );

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
    "structured-review/review-flow.svg",
    "structured-review/review-flow-mobile.svg",
    "structured-review/normal-result.png",
    "structured-review/normal-result-mobile.png",
    "structured-review/question-review.png",
    "structured-review/human-review-required.png",
    "structured-review/human-review-required-mobile.png",
  ]) {
    await access(new URL(`../dist/${asset}`, import.meta.url));
  }
});
