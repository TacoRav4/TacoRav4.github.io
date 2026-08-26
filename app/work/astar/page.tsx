import { sitePath } from "../../site-path";

export default function AStarCaseStudy() {
  return (
    <main className="page-shell" id="main">
      <article>
        <header className="case-hero">
          <a className="back-link" href={sitePath("/#work")}>
            ← Back to selected work
          </a>
          <p className="eyebrow">Case study 04 · Software · Algorithms</p>
          <h1>Terrain-aware pathfinding with A* heuristics</h1>
          <div className="case-summary">
            <p>
              I asked whether a heuristic could use terrain without giving up
              the optimal path. I derived lower bounds for two terrain cost
              functions and built an independent synthetic benchmark. Optimal
              A* matched Dijkstra&apos;s mean path cost. Weighted A* reduced
              expansions further, but it paid for that speed with a higher
              mean path cost.
            </p>
            <ul className="meta-list">
              <li>Python</li>
              <li>Graph search</li>
              <li>Heuristic design</li>
              <li>Benchmark design</li>
            </ul>
          </div>
          <div className="proof case-proof">
            <span>
              optimal A*: same mean path cost · 81.25% fewer expansions
            </span>
            <span>
              weighted A*: 98.57% fewer expansions · +1.83% mean path cost
            </span>
          </div>
        </header>

        <nav className="chapter-row" aria-label="Case-study chapters">
          <ol>
            <li>
              <a href="#question">The question</a>
            </li>
            <li>
              <a href="#process">Heuristic design</a>
            </li>
            <li>
              <a href="#debugging">Correctness checks</a>
            </li>
            <li>
              <a href="#result">Independent benchmark</a>
            </li>
            <li>
              <a href="#interpretation">Interpretation</a>
            </li>
            <li>
              <a href="#attribution">Attribution and boundaries</a>
            </li>
            <li>
              <a href="#takeaway">Takeaway</a>
            </li>
            <li>
              <a href="#future">Future direction</a>
            </li>
          </ol>
        </nav>

        <div className="case-body">
          <section className="chapter" id="question">
            <p className="eyebrow">01 · The question</p>
            <h2>Distance was not enough on uneven terrain</h2>
            <p>
              Ordinary distance sees how far a cell is. It does not see how
              expensive the ground will be. On a terrain grid, a route with
              fewer geometric steps can cost more than a longer route through
              lower-cost cells.
            </p>
            <p>
              I wanted a heuristic that reflected the terrain model while
              remaining a lower bound on the exact remaining cost. That bound
              is the condition that lets optimal A* preserve Dijkstra&apos;s
              answer.
            </p>
          </section>

          <section className="chapter" id="process">
            <p className="eyebrow">02 · Heuristic design</p>
            <h2>Make the estimate pay for terrain</h2>
            <p>
              The clean showcase package uses a new grid model. It contains
              independent implementations for Dijkstra and A*. Weighted A* is
              evaluated as a separate extension. The original course notebook
              remains source context. It is not copied into this route.
            </p>
            <p>
              Jensen&apos;s inequality supplies the exponential lower bound.
              Cauchy–Schwarz supplies the bound for squared elevation
              differences. Both estimates enter A* as lower bounds on the
              remaining route cost.
            </p>
            <div
              className="comparison"
              aria-label="Optimal A-star and weighted A-star comparison"
            >
              <div className="metric">
                Optimal A*
                <strong>preserve cost</strong>
              </div>
              <span className="arrow" aria-hidden="true">
                →
              </span>
              <div className="metric">
                Weighted A*
                <strong>trade cost for speed</strong>
              </div>
            </div>
            <p>
              Weighted A* multiplies the heuristic by 1.8. That deliberate
              change relaxes the optimality guarantee so the benchmark can
              expose the practical tradeoff.
            </p>
            <p className="boundary">
              The synthetic terrain and benchmark are independent of the
              Mount St. Helens course data.
            </p>
          </section>

          <section className="chapter" id="debugging">
            <p className="eyebrow">03 · Correctness checks</p>
            <h2>The lower bound had to hold before speed mattered</h2>
            <p>
              The first question was correctness, not speed. I checked the
              route result against exact search and then tested the heuristic
              itself on smaller terrains.
            </p>
            <ul className="boundary-list">
              <li>The optimal routes were compared with Dijkstra&apos;s exact cost.</li>
              <li>
                Both heuristic estimates stayed below exact remaining cost on
                five smaller seeded terrains.
              </li>
              <li>
                The public entry points rejected out-of-bounds starts and
                goals.
              </li>
              <li>
                The benchmark kept the course notebook separate from the
                synthetic maps.
              </li>
            </ul>
            <p>
              These checks turn the speed comparison into an algorithmic claim
              rather than a timing impression.
            </p>
          </section>

          <section className="chapter" id="result">
            <p className="eyebrow">04 · Independent benchmark</p>
            <h2>Optimality held; weighting changed the cost</h2>
            <figure className="case-figure case-figure-breakout">
              <img
                src={sitePath("/astar/path-comparison.svg")}
                width="720"
                height="614"
                loading="lazy"
                decoding="async"
                alt="A synthetic terrain grid compares an optimal A-star route with a weighted A-star route from the same start to the same goal."
              />
              <figcaption>
                One deterministic synthetic map. The cyan route is optimal;
                the pink route is the weighted search.
              </figcaption>
            </figure>
            <p>
              Across five 90 by 70 synthetic maps, optimal A* returned the
              same mean path cost as Dijkstra while expanding 81.25% fewer
              nodes. Weighted A* expanded 98.57% fewer nodes. Its mean path
              cost was 1.83% higher.
            </p>
            <p>
              The result was reproduced from the same deterministic benchmark
              definition under the independent showcase package. It is not a
              rerun of the course notebook.
            </p>
          </section>

          <section className="chapter reversal" id="interpretation">
            <p className="eyebrow">05 · Interpretation</p>
            <h2>Fewer expansions came with a measured tradeoff</h2>
            <p>
              The optimal heuristic improved search efficiency without
              changing the mean path cost. The weighted version pushed the
              search harder toward the goal and reduced expansions further.
            </p>
            <p className="boundary">
              Weighted A* is not a free improvement. Its lower expansion count
              came with a measured increase in mean path cost.
            </p>
          </section>

          <section className="chapter" id="attribution">
            <p className="eyebrow">06 · Attribution and boundaries</p>
            <h2>The course material and clean reconstruction stay separate</h2>
            <dl className="provenance">
              <div>
                <dt>Jason-authored core</dt>
                <dd>
                  I designed the original course-project heuristics. I also
                  set the independent benchmark question and approved the
                  final interpretation.
                </dd>
              </div>
              <div>
                <dt>Course material</dt>
                <dd>
                  The notebook includes map classes supplied for the
                  assignment. It uses course terrain data. Its test
                  scaffolding remains separate from this page.
                </dd>
              </div>
              <div>
                <dt>AI assistance</dt>
                <dd>
                  Codex supported the clean package implementation and
                  verification. The package is not described as the original
                  course submission.
                </dd>
              </div>
            </dl>
            <p className="boundary">
              The clean package has no download link here. A code-release page
              needs a separate license decision for the code Jason owns.
            </p>
          </section>

          <section className="chapter" id="takeaway">
            <p className="eyebrow">07 · Takeaway</p>
            <h2>Optimality held before speed was traded away</h2>
            <p className="case-takeaway">
              Terrain-aware heuristics made A* more selective while preserving
              the optimal answer. Weighting exposed exactly what faster search
              cost.
            </p>
          </section>

          <section className="chapter" id="future">
            <p className="eyebrow">08 · Future direction</p>
            <h2>Test the tradeoff beyond synthetic terrain</h2>
            <p>
              Next, I would test the heuristic on terrain families with
              sharper elevation changes. I would also measure memory use and
              wall-clock behavior under a fixed environment. Those tests would
              show whether the node-count tradeoff remains useful outside this
              synthetic benchmark.
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
