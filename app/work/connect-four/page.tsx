import { sitePath } from "../../site-path";

export default function ConnectFourCaseStudy() {
  return (
    <main className="page-shell" id="main">
      <article>
        <header className="case-hero">
          <a className="back-link" href={sitePath("/#work")}>
            ← Back to selected work
          </a>
          <p className="eyebrow">
            Case study 03 · Software · Game-tree search
          </p>
          <h1>Rerunning an old Connect Four agent</h1>
          <div className="case-summary">
            <p>
              I recovered a Connect Four agent from a UC Davis course project.
              It uses minimax with alpha-beta pruning. Before trusting a
              performance claim, I froze the agent at depth 6 and held back
              100 fresh seeds. A second machine then reran every game.
            </p>
            <ul className="meta-list">
              <li>Python</li>
              <li>Minimax · Alpha-beta</li>
              <li>Benchmark design</li>
              <li>Cross-machine reproduction</li>
            </ul>
          </div>
          <div className="proof case-proof">
            <span>
              93/100 held out · depth 6 · Wilson 95% [86.3%, 96.6%]
            </span>
            <span>140/140 outcomes matched on a second machine</span>
          </div>
        </header>

        <nav className="chapter-row" aria-label="Case-study chapters">
          <ol>
            <li>
              <a href="#recovered-coursework">Recovered coursework</a>
            </li>
            <li>
              <a href="#held-out-result">Benchmark contract</a>
            </li>
            <li>
              <a href="#uncertainty-reproduction">
                Uncertainty and reproduction
              </a>
            </li>
            <li>
              <a href="#boundaries">Boundaries</a>
            </li>
          </ol>
        </nav>

        <div className="case-body">
          <section className="chapter" id="recovered-coursework">
            <p className="eyebrow">01 · Recovered coursework</p>
            <h2>The search code came from an old course project</h2>
            <p>
              I wrote the agent for ECS 170 at UC Davis and recovered it from
              an old hard drive in 2026. The search itself is ordinary: minimax
              with alpha-beta pruning to a fixed depth. A windowed evaluator
              scores each position, and the same heuristic orders the moves so
              that pruning actually pays off.
            </p>
            <p>
              This page keeps the original coursework separate from the 2026
              correction and benchmark audit. They are different work, done
              years apart.
            </p>
          </section>

          <section className="chapter" id="held-out-result">
            <p className="eyebrow">02 · Frozen contract, held-out result</p>
            <h2>Fix the depth, then hold seeds back</h2>
            <p>
              The final test used a fixed search depth of 6 against the
              unchanged 1001-rollout Monte Carlo baseline. Seeds 40–139 stayed
              untouched until the agent was frozen, with alpha-beta playing
              first on even seeds and second on odd ones. No move timeout
              could change the depth or substitute a different move, so CPU
              speed dropped out of the result entirely.
            </p>
            <p className="boundary">
              The configuration used 100 held-out games at fixed depth 6
              against the unchanged 1001-rollout baseline. First player
              alternated by seed.
            </p>
            <figure className="case-figure case-figure-breakout connect-four-figure">
              <picture>
                <source
                  media="(max-width: 540px)"
                  srcSet={sitePath("/connect-four/heldout-evidence-mobile.svg")}
                />
                <img
                  src={sitePath("/connect-four/heldout-evidence.svg")}
                  width="1200"
                  height="760"
                  loading="lazy"
                  decoding="async"
                  alt="A seed-level matrix shows 93 wins and seven losses across held-out seeds 40 through 139. A second panel places 93/100 inside its Wilson 95 percent interval from 86.3 to 96.6 percent. The figure also records that all 140 outcomes matched on a second machine."
                />
              </picture>
              <figcaption>
                Generated from the frozen benchmark artifact. Each mark is one
                held-out seed, in order from 40 through 139. The phone layout
                uses a separate export with larger labels.
              </figcaption>
            </figure>
            <p>
              The holdout produced 93 wins and seven losses. No game ended in
              a tie. I report 93/100 so the sample size stays visible.
            </p>
          </section>

          <section className="chapter" id="uncertainty-reproduction">
            <p className="eyebrow">03 · Uncertainty and reproduction</p>
            <h2>A hundred games still leaves a wide interval</h2>
            <p>
              The Wilson 95% interval is [86.3%, 96.6%]. A hundred games only
              narrows the range so far, which is why the interval sits next to
              the point estimate instead of behind it. 93/100 is not an exact
              strength rating.
            </p>
            <p>
              The rerun used a second machine. Its operating system differed,
              as did the Python minor version. All 140 games matched
              outcome-for-outcome, including the same seven held-out losses.
              Matching each game is stronger evidence than reproducing only
              the aggregate win rate.
            </p>
          </section>

          <section className="chapter" id="boundaries">
            <p className="eyebrow">04 · Boundaries</p>
            <h2>Who did what, and what this result is not</h2>
            <dl className="provenance">
              <div>
                <dt>Original coursework</dt>
                <dd>
                  I wrote the UC Davis agent. It uses minimax with alpha-beta
                  pruning. A window-based evaluator scores positions and
                  orders the moves.
                </dd>
              </div>
              <div>
                <dt>2026 verification</dt>
                <dd>
                  I directed the recovery, including the terminal-detection
                  correction. The frozen holdout design and the final claim
                  are mine.
                </dd>
              </div>
              <div>
                <dt>AI assistance</dt>
                <dd>
                  Codex supported implementation and the measurement audit.
                  Claude independently reran the frozen benchmarks.
                </dd>
              </div>
            </dl>
            <p>
              This benchmark does not solve Connect Four. Its result applies
              only at the fixed depth against the unchanged Monte Carlo
              baseline. Play against stronger search opponents remains
              untested. The recovered coursework source is still private;
              publication remains a separate decision.
            </p>
            <a className="card-link" href={sitePath("/#work")}>
              Back to the other projects →
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}
