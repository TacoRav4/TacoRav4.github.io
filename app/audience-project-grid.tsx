"use client";

import { useState } from "react";
import { sitePath } from "./site-path";

type Route = "industry" | "research";

const routeCopy = {
  industry: {
    line: "I build machine-learning, data, and scientific software systems—and test whether their improvements survive harder settings.",
    status:
      "Industry route selected; projects below reordered around systems, validation, and engineering tradeoffs.",
  },
  research: {
    line: "I use computational models and large-scale data to find where a theory’s predictions break—and understand why.",
    status:
      "Research / PhD route selected; projects below reordered around questions, failed predictions, and revised explanations.",
  },
} satisfies Record<Route, { line: string; status: string }>;

const projects = [
  {
    id: "quickbin",
    className: "featured",
    eyebrow: "QuickBin · Featured experience",
    title: "Building trustworthy evidence for neural metagenome binning",
    story:
      "Genome-held-out retraining lowered contamination internally, but external evaluation reversed the model ordering.",
    why: {
      industry: "Industry lens: evaluation systems and transfer risk.",
      research: "Research lens: an external reversal narrowed the claim.",
    },
    trace: {
      left: "internal",
      right: "external",
      label:
        "Internal improvement followed by an external ordering reversal",
      reversal: true,
    },
    proof: [
      "2,013 genomes · 8.29 Gbp",
      "contamination 1.7530 → 1.3724 internally",
      "external CAMI community: N = 1",
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
      "A compact algorithm story about admissibility, search effort, and the cost of accepting a faster weighted route.",
    why: {
      industry: "Industry lens: a bounded performance tradeoff.",
      research: "Research lens: admissible assumptions made testable.",
    },
    trace: {
      left: "Dijkstra",
      right: "A*",
      label: "Dijkstra and optimal A star reach the same path cost",
      reversal: false,
    },
    proof: [
      "optimal A*: same mean path cost",
      "81.25% fewer expanded nodes",
      "weighted A*: +1.83% mean cost",
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
      "Recurrence helped on clean synthetic sequences. Real MIDI exposed a larger representation bottleneck and redirected the research.",
    why: {
      industry: "Industry lens: diagnosis found an upstream bottleneck.",
      research: "Research lens: a failed transfer redirected the hypothesis.",
    },
    trace: {
      left: "synthetic",
      right: "MIDI",
      label:
        "Synthetic gain followed by a real MIDI representation bottleneck",
      reversal: true,
    },
    proof: [
      "synthetic accuracy: 0.8101 SRN / 0.7529 EMA+MLP",
      "six-piece difficulty-graded corpus",
      "54 predeclared sensitivity conditions",
    ],
    boundary:
      "Synthetic accuracy and descriptive MIDI behavior remain separate.",
    href: "/work/tonal-inference/",
  },
  {
    id: "harmonic",
    className: "compact",
    eyebrow: "Harmonic surprisal · Data",
    title: "Testing—and weakening—a Wundt-curve hypothesis",
    story:
      "An apparent inverted-U disappeared when unequal decade samples were handled through weighted sensitivity analyses.",
    why: {
      industry: "Industry lens: robustness checks changed the usable result.",
      research: "Research lens: sensitivity analysis weakened the hypothesis.",
    },
    trace: {
      left: "unweighted",
      right: "weighted",
      label:
        "An unweighted curve changed after weighting and weakened the claim",
      reversal: true,
    },
    proof: [
      "667,858 rows → 277,925 songs",
      "temporal model: N = 12 decades",
      "weighted fits: no in-range inverted-U",
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
      "A recovered course agent whose measured win rate moved twice for reasons that had nothing to do with the search itself. The verified result uses fixed depth 6 against an unmodified 1001-rollout Monte Carlo baseline.",
    why: {
      industry: "Industry lens: a measurement bug caught before publication.",
      research: "Research lens: two artifacts separated from the real effect.",
    },
    trace: {
      left: "frozen",
      right: "reproduced",
      label:
        "The frozen Connect Four result reproduced on independent hardware",
      reversal: false,
    },
    proof: [
      "93/100 on held-out seeds 40-139",
      "140/140 games reproduced on a second machine",
      "5.7x harness slowdown found and removed",
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

export default function AudienceProjectGrid() {
  const [route, setRoute] = useState<Route>("industry");
  const sortedProjects = order[route].map(
    (id) => projects.find((project) => project.id === id)!,
  );

  return (
    <>
      <section className="hero" aria-labelledby="page-title">
        <div>
          <p className="eyebrow">Research Engineer · Merced, California</p>
          <div className="hero-title-row">
            <h1 id="page-title">Zihao (Jason) Zhang</h1>
            <div className="portrait-placeholder">
              Portrait placeholder
              <span>Pending Jason&apos;s photo</span>
            </div>
          </div>
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
        <div className="hero-copy">
          <h2>{routeCopy[route].line}</h2>
          <p>
            M.S. candidate in Cognitive and Information Sciences at UC Merced.
            I work across scientific ML, bioinformatics, computational music,
            and reproducible software.
          </p>
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
                  onClick={() => setRoute(candidate)}
                >
                  {candidate === "industry" ? "Industry" : "Research / PhD"}
                </button>
              ))}
            </div>
            <p className="route-status" aria-live="polite">
              {routeCopy[route].status}
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <h2 id="work-title">Selected evidence</h2>
          <p>
            Five projects, one habit: build a valid comparison, test it in a
            harder setting, and narrow the claim when the evidence changes.
          </p>
        </div>

        <div className="trace" aria-hidden="true">
          <span className="trace-dot" />
          <span className="trace-line" />
          <span className="trace-dot" />
          <span className="trace-line" />
          <span className="trace-dot reversal" />
          <span className="trace-line dashed" />
          <span className="trace-dot" />
          <span className="trace-line" />
          <span className="trace-dot" />
        </div>

        <div className="project-grid">
          {sortedProjects.map((project) => {
            if ("layout" in project && project.layout === "split") {
              return (
                <article
                  className={`project-card ${project.className}`}
                  key={project.id}
                >
                  <div className="wide-card-copy">
                    <p className="eyebrow">{project.eyebrow}</p>
                    <h3>{project.title}</h3>
                    <p>{project.story}</p>
                    <p className="card-why">{project.why[route]}</p>
                    <div
                      className="card-trace"
                      role="img"
                      aria-label={project.trace.label}
                    >
                      <span>{project.trace.left}</span>
                      <span className="line" />
                      <span className="marker">=</span>
                      <span className="line" />
                      <span>{project.trace.right}</span>
                    </div>
                    <div className="proof">
                      {project.proof.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </div>
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
              >
                <p className="eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                <p>{project.story}</p>
                <p className="card-why">{project.why[route]}</p>
                <div
                  className="card-trace"
                  role="img"
                  aria-label={project.trace.label}
                >
                  <span>{project.trace.left}</span>
                  <span className="line" />
                  <span
                    className={`marker ${project.trace.reversal ? "reversal" : ""}`}
                  >
                    {project.trace.reversal ? "×" : "="}
                  </span>
                  <span
                    className={`line ${project.trace.reversal ? "dashed" : ""}`}
                  />
                  <span>{project.trace.right}</span>
                </div>
                <div className="proof">
                  {project.proof.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
                {"boundary" in project && (
                  <p className="boundary">{project.boundary}</p>
                )}
                {"href" in project && (
                  <a className="card-link" href={sitePath(project.href)}>
                    Read case study →
                  </a>
                )}
                {"detail" in project && "visual" in project && (
                  <details>
                    <summary>Expand proof</summary>
                    <figure className="card-detail-figure">
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
                  </details>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
