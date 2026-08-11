"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { sitePath } from "./site-path";

type Route = "industry" | "research";

const routeCopy = {
  industry: {
    status:
      "Industry view. The same projects, ordered to foreground systems work and validation.",
    goal: "Goal: show whether a machine-learning system's improvement survives the setting where it is meant to work.",
  },
  research: {
    status:
      "Research view. The same projects, ordered to foreground failed predictions and revised explanations.",
    goal: "Goal: show where a model's predictions broke and how the explanation changed.",
    line: "I use computational models and large-scale corpora to find where a theory's predictions fail, then work out why.",
  },
} satisfies Record<Route, { status: string; goal: string }> & {
  research: { line: string };
};

const projects = [
  {
    id: "quickbin",
    className: "featured no-figure",
    eyebrow: "QuickBin · Featured experience",
    title: "Building trustworthy evidence for neural metagenome binning",
    story:
      "I built a genome-held-out PacBio benchmark to test whether retraining would transfer beyond internal evaluation. It lowered contamination internally, but external evaluation reversed the model ordering.",
    why: {
      industry: "Industry lens: evaluation systems and transfer risk.",
      research: "Research lens: an external reversal narrowed the claim.",
    },
    proof: [
      {
        label: "reversal",
        value: "external evaluation reversed the model ordering",
        tone: "reversal",
      },
      { label: "benchmark", value: "2,013 genomes · 8.29 Gbp", tone: "plain" },
      {
        label: "internal",
        value: "contamination 1.7530 → 1.3724",
        tone: "plain",
      },
      { label: "external", value: "CAMI community: N = 1", tone: "plain" },
    ],
    boundary:
      "Public V1: prose and newly drawn explanation only; no JGI artifacts.",
    href: "/work/quickbin/",
  },
  {
    id: "astar",
    className: "compact",
    eyebrow: "A* · Software",
    title: "Deriving and testing terrain-aware heuristics",
    story:
      "I derived terrain-aware heuristics to preserve optimality, then measured what weighting them costs. Optimal A* matched Dijkstra's path cost with 81.25% fewer expanded nodes; weighted A* cut expansions by 98.57% while raising mean path cost 1.83%.",
    why: {
      industry: "Industry lens: a bounded performance tradeoff.",
      research: "Research lens: admissible assumptions made testable.",
    },
    proof: [
      {
        label: "matched",
        value: "optimal A*: same mean path cost as Dijkstra",
        tone: "matched",
      },
      {
        label: "expansions",
        value: "81.25% fewer expanded nodes",
        tone: "plain",
      },
      { label: "weighted", value: "+1.83% mean path cost", tone: "plain" },
    ],
    detail:
      "Results come from the independent deterministic synthetic benchmark, not the historical course notebook.",
    visual: {
      src: "/astar/path-comparison.svg",
      width: 720,
      height: 614,
      alt: "Synthetic terrain map showing the optimal A* route and the weighted A* route from start to goal.",
    },
  },
  {
    id: "tonal",
    className: "featured",
    eyebrow: "Tonal inference · Research",
    title: "When better memory cannot fix a lossy representation",
    story:
      "Could learned recurrence track tonal center through changing chord sequences? It helped on clean synthetic data, but real MIDI exposed a representation bottleneck recurrence could not fix.",
    why: {
      industry: "Industry lens: diagnosis found an upstream bottleneck.",
      research: "Research lens: a failed transfer redirected the hypothesis.",
    },
    proof: [
      {
        label: "reversal",
        value: "synthetic gain did not transfer to real MIDI",
        tone: "reversal",
      },
      {
        label: "synthetic",
        value: "0.8101 SRN / 0.7529 EMA+MLP",
        tone: "plain",
      },
      { label: "corpus", value: "six-piece difficulty-graded", tone: "plain" },
      {
        label: "sensitivity",
        value: "54 predeclared conditions",
        tone: "plain",
      },
    ],
    boundary:
      "Synthetic accuracy and descriptive MIDI behavior remain separate.",
    detail:
      "Descriptive real-MIDI behavior, not an accuracy comparison: learned recurrence changed the path and confidence without resolving the dominant tonal bias.",
    visual: {
      src: "/tonal/circle-of-fifths-ema-vs-srn.png",
      width: 1959,
      height: 994,
      alt: "Side-by-side Circle-of-Fifths walks for EMA and SRN on the Twinkle 12 MIDI excerpt, showing different key trajectories that both end near F.",
    },
    href: "/work/tonal-inference/",
  },
  {
    id: "harmonic",
    className: "compact",
    eyebrow: "Harmonic surprisal · Data",
    title: "Testing—and weakening—a Wundt-curve hypothesis",
    story:
      "I tested whether a century of popular-song harmony showed a Wundt-like inverted-U in harmonic surprisal. The apparent curve did not survive weighting for unequal decade samples.",
    why: {
      industry: "Industry lens: robustness checks changed the usable result.",
      research: "Research lens: sensitivity analysis weakened the hypothesis.",
    },
    proof: [
      {
        label: "reversal",
        value: "weighting by decade sample size removed the curve",
        tone: "reversal",
      },
      {
        label: "corpus",
        value: "667,858 rows → 277,925 songs",
        tone: "plain",
      },
      { label: "temporal", value: "N = 12 decades", tone: "plain" },
      { label: "weighted", value: "no in-range inverted-U", tone: "plain" },
    ],
    detail:
      "The unweighted result is reproducible but not robust. Genre differences are statistically detectable with substantial overlap.",
    visual: {
      src: "/harmonic/surprisal-over-time.png",
      width: 1440,
      height: 972,
      alt: "Mean harmonic surprisal by decade with a quadratic fit; the pattern does not hold once decades are weighted by sample size.",
    },
  },
  {
    id: "connect-four",
    className: "wide",
    layout: "split",
    eyebrow: "Connect Four · Software",
    title: "When the benchmark, not the agent, was the bug",
    story:
      "I built a Minimax + Alpha-Beta agent, then made its benchmark reproducible. Two early win rates were artifacts unrelated to the search; the verified result uses fixed depth 6 against an unmodified 1001-rollout Monte Carlo baseline.",
    why: {
      industry: "Industry lens: a measurement bug caught before publication.",
      research: "Research lens: two artifacts separated from the real effect.",
    },
    proof: [
      {
        label: "reproduced",
        value: "140/140 games on a second machine",
        tone: "matched",
      },
      {
        label: "verified",
        value: "93/100 on held-out seeds 40-139",
        tone: "matched",
      },
      {
        label: "harness",
        value: "5.7x slowdown found and removed",
        tone: "plain",
      },
    ],
    detail:
      "Fixed search depth 6 against an unmodified 1001-rollout Monte Carlo baseline; Wilson 95% interval [86.3%, 96.6%].",
    boundary: "The recovered source is not in a public repository yet.",
    visual: {
      src: "/connect-four/benchmark-sequence.svg",
      width: 720,
      height: 360,
      alt: "Benchmark sequence showing 32 percent and 80 percent discarded as measurement artifacts, followed by 39 of 40 development games and the verified held-out result of 93 of 100.",
    },
  },
] as const;

const order: Record<Route, readonly string[]> = {
  industry: ["quickbin", "astar", "tonal", "harmonic", "connect-four"],
  research: ["tonal", "harmonic", "quickbin", "astar", "connect-four"],
};

function ProofBlock({
  rows,
}: {
  rows: readonly { label: string; value: string; tone: string }[];
}) {
  return (
    <div className="proof">
      {rows.map((row) => (
        <span
          key={row.label}
          className={row.tone === "plain" ? undefined : `proof-row-${row.tone}`}
        >
          <span className="proof-label">{row.label}</span>
          <span>{row.value}</span>
        </span>
      ))}
    </div>
  );
}

export default function AudienceProjectGrid() {
  const [route, setRoute] = useState<Route>("industry");
  const gridRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<Map<string, DOMRect> | null>(null);
  const sortedProjects = order[route].map(
    (id) => projects.find((project) => project.id === id)!,
  );

  function chooseRoute(next: Route) {
    const grid = gridRef.current;
    if (grid) {
      const measured = new Map<string, DOMRect>();
      grid.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
        measured.set(el.dataset.flip!, el.getBoundingClientRect());
      });
      beforeRef.current = measured;
    }
    setRoute(next);
  }

  // FLIP: cards travel to their new position so "same evidence, different
  // order" is visible rather than asserted.
  useLayoutEffect(() => {
    const before = beforeRef.current;
    beforeRef.current = null;
    const grid = gridRef.current;
    if (!before || !grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    grid.querySelectorAll<HTMLElement>("[data-flip]").forEach((el) => {
      const a = before.get(el.dataset.flip!);
      if (!a) return;
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (!dx && !dy) return;
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      el.style.zIndex = "1";
      requestAnimationFrame(() => {
        el.style.transition = "transform 320ms cubic-bezier(.2, .7, .3, 1)";
        el.style.transform = "";
      });
      el.addEventListener(
        "transitionend",
        () => {
          el.style.zIndex = "";
        },
        { once: true },
      );
    });
  }, [route]);

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-identity">
          <p className="eyebrow">Research Engineer · Merced, CA</p>
          <h1 id="page-title">
            I build machine-learning systems and the benchmarks that decide
            whether they actually work.
          </h1>
          <p className="hero-bio">
            M.S. candidate in Cognitive and Information Sciences at UC Merced,
            researching how people track tonal structure as music unfolds over
            time. Most recently a summer at a national lab doing machine
            learning and benchmark design for metagenome binning.
          </p>
          <p className="hero-belief">
            I care more about whether a result reproduces than about how good
            it looked the first time.
          </p>
          <div className="hero-actions">
            <a className="cta-button" href="#work">
              Selected work →
            </a>
            <nav className="identity-links" aria-label="Homepage contact">
              <a
                href="https://github.com/TacoRav4"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/jasonzzh"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:jasonzhang5@ucmerced.edu">Email</a>
              <a
                href={sitePath("/resume.pdf")}
                download="Zihao_Jason_Zhang_Resume.pdf"
              >
                Resume
              </a>
            </nav>
          </div>
        </div>
        <figure className="profile-figure">
          <img
            className="profile-photo"
            src={sitePath("/headshot.png")}
            width={146}
            height={219}
            alt="Zihao (Jason) Zhang"
          />
        </figure>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="section-heading work-heading">
          <div>
            <p className="eyebrow">05 / Selected work</p>
            <h2 id="work-title">After the first result</h2>
          </div>
          <div className="work-intro">
            <p>
              The problems range from genome binning and pathfinding to music
              cognition and game-tree search; the build and the question matter
              as much as the result.
              <br />
              <span className="work-index">
                Genomics · Pathfinding · Music cognition · Corpus statistics ·
                Game-tree search
              </span>
            </p>
          </div>
        </div>

        <div className="route-control" aria-labelledby="route-label">
          <p id="route-label">
            <strong>Choose a reading route</strong>
          </p>
          <div className="route-buttons">
            {(["industry", "research"] as const).map((candidate) => (
              <button
                key={candidate}
                type="button"
                aria-pressed={route === candidate}
                onClick={() => chooseRoute(candidate)}
              >
                {candidate === "industry" ? "Industry" : "Research / PhD"}
              </button>
            ))}
          </div>
          <p className="route-status" aria-live="polite">
            {routeCopy[route].status}
            <br />
            {routeCopy[route].goal}
            {route === "research" ? (
              <>
                <br />
                {routeCopy.research.line}
              </>
            ) : null}
          </p>
        </div>

        <div className="project-grid" ref={gridRef}>
          {sortedProjects.map((project) => {
            if ("layout" in project && project.layout === "split") {
              return (
                <article
                  className={`project-card ${project.className}`}
                  key={project.id}
                  data-flip={project.id}
                >
                  <div className="wide-card-copy">
                    <p className="eyebrow">{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <p>{project.story}</p>
                    <p className="card-why">{project.why[route]}</p>
                    <ProofBlock rows={project.proof} />
                    <p className="boundary">{project.boundary}</p>
                  </div>
                  <figure className="card-detail-figure wide-card-visual">
                    <img
                      src={sitePath(project.visual.src)}
                      width={project.visual.width}
                      height={project.visual.height}
                      loading="lazy"
                      decoding="async"
                      alt={project.visual.alt}
                    />
                    <figcaption>{project.detail}</figcaption>
                  </figure>
                </article>
              );
            }

            return (
              <article
                className={`project-card ${project.className}`}
                key={project.id}
                data-flip={project.id}
              >
                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p>{project.story}</p>
                <p className="card-why">{project.why[route]}</p>
                {"visual" in project && (
                  <figure className="card-detail-figure">
                    <img
                      src={sitePath(project.visual.src)}
                      width={project.visual.width}
                      height={project.visual.height}
                      loading="lazy"
                      decoding="async"
                      alt={project.visual.alt}
                    />
                    {"detail" in project && (
                      <figcaption>{project.detail}</figcaption>
                    )}
                  </figure>
                )}
                <ProofBlock rows={project.proof} />
                {"boundary" in project && (
                  <p className="boundary">{project.boundary}</p>
                )}
                {"href" in project && (
                  <a className="card-link" href={sitePath(project.href)}>
                    Read case study →
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
