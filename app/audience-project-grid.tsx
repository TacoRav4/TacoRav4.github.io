"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { sitePath } from "./site-path";

type Route = "industry" | "research";

const routeCopy = {
  industry: {
    status:
      "Industry view. Same projects, reordered so the systems work comes first.",
    goal: "The cards lead with the result and show how it was tested.",
  },
  research: {
    status:
      "Research view. Same projects, reordered so the modeling questions lead.",
    goal: "The cards lead with the research question and follow the result.",
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
    title: "Building trustworthy evidence for neural metagenome binning",
    story:
      "I retrained QuickBin's terminal network for PacBio HiFi and built a genome-held-out workflow. Contamination fell on synthetic genomes and one CAMI II community. Lower recovery changed the external ranking.",
    why: {
      industry: "The external pipeline ran end to end. Its gains were measured.",
      research: "Contamination reduction held. The composite ranking did not.",
    },
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
    title: "Deriving and testing terrain-aware heuristics",
    story:
      "I derived terrain-aware heuristics to preserve optimality, then measured what weighting them costs. Optimal A* matched Dijkstra's path cost with 81.25% fewer expanded nodes; weighted A* cut expansions by 98.57% while raising mean path cost 1.83%.",
    why: {
      industry: "The faster search came with a measured cost.",
      research: "The benchmark made the admissibility assumptions testable.",
    },
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
  },
  {
    id: "tonal",
    className: "featured",
    eyebrow: "Tonal inference · Research",
    title: "Better memory could not fix a lossy representation",
    story:
      "Learned recurrence tracked tonal center better on clean synthetic sequences. Real MIDI exposed a representation bottleneck that more memory could not repair.",
    why: {
      industry: "The diagnosis located the bottleneck upstream of the model.",
      research: "The failed transfer redirected the hypothesis.",
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
      {
        label: "sensitivity",
        value: "54 predeclared conditions",
        tone: "plain",
      },
    ],
    boundary:
      "Synthetic accuracy and descriptive MIDI behavior remain separate.",
    detail:
      "The 54-condition grid exposes the recovery–stability frontier.",
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
    title: "Testing—and weakening—a Wundt-curve hypothesis",
    story:
      "I tested whether a century of popular-song harmony showed a Wundt-like inverted-U in harmonic surprisal. The apparent curve did not survive weighting for unequal decade samples.",
    why: {
      industry: "A robustness check changed the result worth reporting.",
      research: "Sensitivity analysis weakened the original hypothesis.",
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
  },
  {
    id: "connect-four",
    className: "wide",
    layout: "split",
    eyebrow: "Connect Four · Software",
    title: "When the benchmark, not the agent, was the bug",
    story:
      "I recovered an old Minimax agent and rebuilt its benchmark. Two early win rates were artifacts. The final test fixed depth at 6 against the unchanged Monte Carlo baseline.",
    why: {
      industry: "The measurement bug was caught before publication.",
      research: "The rerun separated the artifacts from the final result.",
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
            width={1000}
            height={1500}
            alt="Zihao (Jason) Zhang"
          />
        </figure>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">05 / Selected work</p>
            <h2 id="work-title">After the first result</h2>
          </div>
          <div className="work-intro">
            <p>
              Five projects, one habit: the first result is where the checking
              starts, not where it stops.
            </p>
            <ul className="work-index" aria-label="Project areas">
              <li>Genomics</li>
              <li>Pathfinding</li>
              <li>Music cognition</li>
              <li>Corpus statistics</li>
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
                <p className="card-why">{project.why[route]}</p>
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
