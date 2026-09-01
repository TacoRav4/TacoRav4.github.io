"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { sitePath } from "./site-path";

type Route = "industry" | "research";

const routeCopy = {
  industry: {
    status:
      "Industry view. Same projects, reordered so the systems work comes first.",
    goal:
      "The cards introduce the system or question, then show how the result was tested.",
  },
  research: {
    status:
      "Research view. Same projects, reordered so the modeling questions lead.",
    goal:
      "The cards introduce the question or phenomenon, then show how the result held up.",
    line: "I use computational models to study how statistical structure becomes expectation. Large corpora provide the harder test.",
  },
} satisfies Record<Route, { status: string; goal: string }> & {
  research: { line: string };
};

const projects = [
  {
    id: "quickbin",
    className: "featured",
    eyebrow: "QuickBin · Featured experience",
    title: "Adapting QuickBin for PacBio metagenome binning",
    story:
      "I retrained QuickBin's terminal network for PacBio HiFi and built a genome-held-out workflow. Contamination fell on synthetic genomes and one CAMI II community. Lower recovery changed the external ranking.",
    why: "Retraining lowered contamination internally, but the external ranking did not hold.",
    proof: [
      {
        label: "internal",
        value: "2,013 genomes · AM1 contamination 1.7530 → 1.3724",
        tone: "plain",
      },
      {
        label: "vs MetaBAT2",
        value: "shared-U2500 Total Score 1431 vs 1135 · MetaBAT2 seed 1",
        tone: "plain",
      },
      {
        label: "external",
        value: "composite ranking changed · CAMI II, N = 1",
        tone: "reversal",
      },
    ],
    boundary:
      "Internal results use synthetic genomes; external evaluation uses public CAMI II. QuickBin is part of open-source BBTools.",
    detail:
      "Both retrained networks lowered contamination on genomes excluded before training.",
    visual: {
      src: "/quickbin/heldout-dotplot.svg",
      mobileSrc: "/quickbin/heldout-dotplot-mobile.svg",
      width: 960,
      height: 420,
      mobileWidth: 420,
      mobileHeight: 360,
      alt: "Dot plot of contamination on held-out genomes. On the 299-genome test split, both retrained networks score below the shipping network's 1.7530, with AM1 lowest at 1.3724. The 279-genome validation split shows the same direction.",
    },
    href: "/work/quickbin/",
  },
  {
    id: "astar",
    className: "compact",
    eyebrow: "A* · Software",
    title: "Terrain-aware pathfinding with A* heuristics",
    story:
      "I derived terrain-aware heuristics to preserve optimality, then measured what weighting them costs. Optimal A* matched Dijkstra's path cost with 81.25% fewer expanded nodes; weighted A* cut expansions by 98.57% while raising mean path cost 1.83%.",
    why: "Fewer expansions came with a measured path-cost tradeoff.",
    proof: [
      {
        label: "matched",
        value: "optimal A*: same mean path cost as Dijkstra",
        tone: "matched",
      },
      {
        label: "weighted",
        value: "98.57% fewer expansions · +1.83% mean path cost",
        tone: "plain",
      },
    ],
    detail:
      "A deterministic synthetic benchmark, separate from the course notebook.",
    visual: {
      src: "/astar/path-comparison.svg",
      width: 720,
      height: 614,
      alt: "Synthetic terrain map showing the optimal A* route and the weighted A* route from start to goal.",
    },
    href: "/work/astar/",
  },
  {
    id: "structured-review",
    className: "wide",
    layout: "figure-first",
    eyebrow: "Structured Review Lab · AI workflow",
    title: "A document-review workflow that checks its own evidence",
    story:
      "I built a local-first React/TypeScript and FastAPI/Pydantic workflow for synthetic business documents. The app validates structured findings and checks every evidence excerpt against the original input before it reaches the result view.",
    why: "A valid model response still has to earn its way onto the screen.",
    proof: [
      {
        label: "mock",
        value:
          "20 synthetic fixtures · deterministic contract evaluation · schema, grounding, and review precision/recall 1.0",
        tone: "plain",
      },
      {
        label: "live",
        value: "2-case API smoke test · gpt-5.6-luna · 2,608.8 ms mean/p50",
        tone: "plain",
      },
      {
        label: "guardrail",
        value: "one retry · safe human-review fallback",
        tone: "plain",
      },
    ],
    boundary:
      "Mock and live results stay separate. Live values describe two synthetic fixtures, not broad model accuracy or production performance.",
    detail:
      "A static flow diagram shows how output earns its way onto the result screen.",
    visual: {
      src: "/structured-review/review-flow.svg",
      mobileSrc: "/structured-review/review-flow-mobile.svg",
      width: 1200,
      height: 430,
      mobileWidth: 680,
      mobileHeight: 980,
      alt: "Flow diagram of a synthetic document moving from a Mock or OpenAI provider through Pydantic parsing. Exact-substring evidence checks lead to a validated result or human review.",
    },
    href: "/work/structured-review-lab/",
  },
  {
    id: "tonal",
    className: "featured",
    eyebrow: "Tonal inference · Research",
    title: "Modeling how tonal center inference updates over time",
    story:
      "Learned recurrence tracked tonal center better on clean synthetic sequences. Real MIDI exposed a representation bottleneck that more memory could not repair.",
    why: "Better memory could not fix a lossy representation.",
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
      {
        label: "sensitivity",
        value: "54 predeclared conditions",
        tone: "plain",
      },
    ],
    boundary:
      "Synthetic accuracy and descriptive MIDI behavior remain separate.",
    detail:
      "The 54-condition grid exposes the recovery and stability frontier.",
    visual: {
      src: "/tonal/gate-sensitivity-pareto.png",
      width: 1166,
      height: 952,
      alt: "Scatter plot of 54 predeclared settings. The marked Pareto frontier shows that stronger minor-mode recovery generally came with more stability damage.",
    },
    href: "/work/tonal-inference/",
  },
  {
    id: "harmonic",
    className: "compact",
    eyebrow: "Harmonic surprisal · Data",
    title: "Harmonic surprisal across a century of popular music",
    story:
      "I tested whether a century of popular-song harmony showed a Wundt-like inverted-U in harmonic surprisal. The apparent curve did not survive weighting for unequal decade samples.",
    why: "The apparent inverted-U did not survive weighting for unequal decade samples.",
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
      {
        label: "temporal",
        value: "N = 12 decades · no weighted in-range inverted-U",
        tone: "plain",
      },
    ],
    detail:
      "Weighting removes the apparent curve.",
    visual: {
      src: "/harmonic/temporal-sensitivity.png",
      width: 1512,
      height: 1080,
      alt: "Decadal harmonic surprisal means with quadratic fits under three weighting schemes. The unweighted line bends downward within the observed range, while weighting by song count or inverse variance removes that shape.",
    },
    href: "/work/harmonic-surprisal/",
  },
  {
    id: "connect-four",
    className: "wide",
    layout: "split",
    eyebrow: "Connect Four · Software",
    title: "Benchmarking an old Connect Four agent",
    story:
      "I recovered an old Minimax agent and rebuilt its benchmark. Two early win rates were artifacts. The final test fixed depth at 6 against the unchanged Monte Carlo baseline.",
    why: "The benchmark, not the agent, was the bug.",
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
      "Frozen depth-6 holdout with its Wilson interval; all 140 outcomes reproduced.",
    boundary: "The recovered source is not in a public repository yet.",
    visual: {
      src: "/connect-four/final-evidence.svg",
      width: 720,
      height: 340,
      alt: "A point at 93 percent marks the held-out result of 93 wins in 100 games, with the Wilson 95 percent interval drawn from 86.3 to 96.6 percent. A note records that a second machine reproduced all 140 games at fixed depth 6 against the unchanged 1001-rollout Monte Carlo baseline.",
    },
    href: "/work/connect-four/",
  },
] as const;

const order: Record<Route, readonly string[]> = {
  industry: [
    "quickbin",
    "astar",
    "tonal",
    "harmonic",
    "structured-review",
    "connect-four",
  ],
  research: [
    "tonal",
    "harmonic",
    "quickbin",
    "astar",
    "structured-review",
    "connect-four",
  ],
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

function ProjectFigure({
  visual,
  className,
  caption,
}: {
  visual: {
    src: string;
    width: number;
    height: number;
    alt: string;
    mobileSrc?: string;
    mobileWidth?: number;
    mobileHeight?: number;
  };
  className?: string;
  caption?: string;
}) {
  return (
    <figure className={className ?? "card-detail-figure"}>
      <picture>
        {visual.mobileSrc ? (
          <source media="(max-width: 540px)" srcSet={sitePath(visual.mobileSrc)} />
        ) : null}
        <img
          src={sitePath(visual.src)}
          width={visual.width}
          height={visual.height}
          loading="lazy"
          decoding="async"
          alt={visual.alt}
        />
      </picture>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
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
            src={sitePath("/headshot.jpg")}
            width={1200}
            height={1800}
            alt="Zihao (Jason) Zhang"
          />
        </figure>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">After the first result</p>
            <h2 id="work-title">Selected Work</h2>
          </div>
          <div className="work-intro">
            <p>
              Six projects, one habit: the first result is where the checking
              starts, not where it stops.
            </p>
            <ul className="work-index" aria-label="Project areas">
              <li>Genomics</li>
              <li>Pathfinding</li>
              <li>Music cognition</li>
              <li>Corpus statistics</li>
              <li>AI workflows</li>
              <li>Game-tree search</li>
            </ul>
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
          </div>
        </div>

        <div className="project-grid" ref={gridRef}>
          {sortedProjects.map((project) => {
            if ("layout" in project && project.layout === "figure-first") {
              return (
                <article
                  className={`project-card ${project.className} figure-first`}
                  key={project.id}
                  data-flip={project.id}
                >
                  <div className="wide-card-heading">
                    <p className="eyebrow">{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                  </div>
                  <ProjectFigure
                    visual={project.visual}
                    className="card-detail-figure wide-card-visual"
                    caption={project.detail}
                  />
                  <div className="wide-card-copy figure-first-copy">
                    <div>
                      <p>{project.story}</p>
                      <p className="card-why">{project.why}</p>
                    </div>
                    <div>
                      <ProofBlock rows={project.proof} />
                      <p className="boundary">{project.boundary}</p>
                      <a className="card-link" href={sitePath(project.href)}>
                        Read case study →
                      </a>
                    </div>
                  </div>
                </article>
              );
            }

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
                    <p className="card-why">{project.why}</p>
                    <ProofBlock rows={project.proof} />
                    <p className="boundary">{project.boundary}</p>
                    {"href" in project && (
                      <a className="card-link" href={sitePath(project.href)}>
                        Read case study →
                      </a>
                    )}
                  </div>
                  <ProjectFigure
                    visual={project.visual}
                    className="card-detail-figure wide-card-visual"
                    caption={project.detail}
                  />
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
                <p className="card-why">{project.why}</p>
                {"visual" in project && (
                  <ProjectFigure
                    visual={project.visual}
                    caption={"detail" in project ? project.detail : undefined}
                  />
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
