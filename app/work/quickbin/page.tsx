import { sitePath } from "../../site-path";

export default function QuickBinCaseStudy() {
  return (
    <main className="page-shell" id="main">
      <article>
        <header className="case-hero">
          <a className="back-link" href={sitePath("/#work")}>
            ← Back to selected work
          </a>
          <p className="eyebrow">
            Case study 01 · Experience · DOE Joint Genome Institute · Affiliate
            Intern · May 22 to July 25, 2026
          </p>
          <h1>Building trustworthy evidence for neural metagenome binning</h1>
          <div className="case-summary">
            <p>
              I adapted QuickBin&apos;s terminal network and evaluation
              workflow to PacBio HiFi, then built leakage-safe tests to
              determine whether the gains were real. Both retrained models
              reduced contamination on held-out synthetic genomes.
              Contamination fell in one CAMI II community too, but lower
              recovery changed the composite ranking. In the internal shared-U2500
              comparison, the selected candidate had the highest Total Score
              among the systems tested.
            </p>
            <ul className="meta-list">
              <li>Python</li>
              <li>Java</li>
              <li>Bash</li>
              <li>Slurm / HPC</li>
              <li>Benchmark design</li>
              <li>Bioinformatics pipelines</li>
            </ul>
          </div>
          <div className="proof case-proof">
            <span>
              2,013 genomes · 8.29 Gbp · 1,435 / 279 / 299 genome-level split
            </span>
          </div>
        </header>

        <nav className="chapter-row" aria-label="Case-study chapters">
          <ol>
            <li>
              <a href="#role">Role and existing system</a>
            </li>
            <li>
              <a href="#merge-and-split">Merge logic and split</a>
            </li>
            <li>
              <a href="#internal-result">Held-out internal result</a>
            </li>
            <li>
              <a href="#external-reversal">External reversal</a>
            </li>
            <li>
              <a href="#boundaries-next">Boundaries and next test</a>
            </li>
          </ol>
        </nav>

        <div className="case-body">
          <section className="chapter" id="role">
            <p className="eyebrow">01 · Role and existing system</p>
            <h2>Can PacBio-specific retraining improve QuickBin?</h2>
            <p>
              QuickBin and its surrounding infrastructure already existed when
              the internship started. I focused on a PacBio-specific training
              workflow and the tests needed to judge it. Retraining the
              terminal network was one part of that work. The real test was
              whether an improvement survived data produced elsewhere.
            </p>
            <p>
              Much of that work was unglamorous input plumbing. Before any
              scientific claim was possible, the comparison workflow needed
              source tracing and validated BAM/SAM recovery. Those tasks
              support the evidence; they are not presented as a model
              invention.
            </p>
          </section>

          <section className="chapter" id="merge-and-split">
            <p className="eyebrow">02 · Merge logic and genome-level split</p>
            <h2>Five gates decide every merge</h2>
            <p>
              QuickBin&apos;s public source uses five escalating gates, not a
              three-stage pipeline. Cheap checks reject pairs early; only the
              pairs that survive reach the terminal neural network, the part I
              retrained.
            </p>
            <table className="gate-table">
              <thead>
                <tr>
                  <th scope="col">Gate</th>
                  <th scope="col">Check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>
                    GC, HH and CAGA differences; depth ratio and covariance
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Trimer composition difference</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>
                    Tetramer difference with depth ratio and a k-mer
                    probability estimate
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>
                    Pentamer difference, with a weaker fallback for short
                    contigs
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Small neural network for the pairs still unresolved</td>
                </tr>
              </tbody>
            </table>
            <figure className="case-figure">
              <img
                src={sitePath("/quickbin/merge-decision.svg")}
                width={960}
                height={430}
                loading="lazy"
                decoding="async"
                alt="A blue and amber candidate contig pair passes through composition and coverage filters to the retrained 28-feature neural network. Rejecting a pair from different genomes keeps two clean bins, while a wrong merge produces one contaminated bin."
              />
              <figcaption>
                One merge decision, audience-level. The funnel is schematic;
                no per-gate survival counts are available.
              </figcaption>
            </figure>
            <p>
              The evaluation contract came first. A genome-level split
              separated the 2,013 genomes before any training example was
              made. The split was 1,435 train / 279 validation / 299 evaluation,
              and the resulting train-only input was checked for zero
              cross-split leakage.
            </p>
            <figure className="quickbin-diagram">
              <svg
                viewBox="0 0 900 300"
                role="img"
                aria-labelledby="split-diagram-title split-diagram-desc"
              >
                <title id="split-diagram-title">
                  Genome-held-out experimental contract
                </title>
                <desc id="split-diagram-desc">
                  A newly drawn flow from 2,013 genomes into three separate
                  genome splits, followed by train-only example generation
                  and confirmation of zero cross-split leakage.
                </desc>
                <defs>
                  <marker
                    id="split-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path
                      className="diagram-arrowhead"
                      d="M 0 0 L 10 5 L 0 10 z"
                    />
                  </marker>
                </defs>

                <rect
                  className="diagram-box"
                  x="20"
                  y="80"
                  width="190"
                  height="140"
                />
                <text className="diagram-label" x="115" y="122">
                  <tspan x="115">2,013 genomes</tspan>
                  <tspan className="diagram-small" x="115" dy="28">
                    8.29 Gbp
                  </tspan>
                  <tspan className="diagram-small" x="115" dy="24">
                    62,714 contigs
                  </tspan>
                </text>

                <path
                  className="diagram-line"
                  d="M 210 150 H 270"
                  markerEnd="url(#split-arrow)"
                />

                <rect
                  className="diagram-box"
                  x="280"
                  y="40"
                  width="150"
                  height="60"
                />
                <text className="diagram-label" x="355" y="76">
                  1,435 train
                </text>
                <rect
                  className="diagram-box"
                  x="280"
                  y="120"
                  width="150"
                  height="60"
                />
                <text className="diagram-label" x="355" y="156">
                  279 validation
                </text>
                <rect
                  className="diagram-box"
                  x="280"
                  y="200"
                  width="150"
                  height="60"
                />
                <text className="diagram-label" x="355" y="236">
                  299 evaluation
                </text>

                <path
                  className="diagram-line"
                  d="M 430 150 H 500"
                  markerEnd="url(#split-arrow)"
                />

                <rect
                  className="diagram-box"
                  x="500"
                  y="80"
                  width="170"
                  height="140"
                />
                <text className="diagram-label" x="585" y="128">
                  <tspan x="585">training examples</tspan>
                  <tspan x="585" dy="28">
                    generated
                  </tspan>
                  <tspan className="diagram-small" x="585" dy="26">
                    train-only
                  </tspan>
                </text>

                <path
                  className="diagram-line"
                  d="M 670 150 H 720"
                  markerEnd="url(#split-arrow)"
                />

                <rect
                  className="diagram-box diagram-confirmed"
                  x="720"
                  y="80"
                  width="160"
                  height="140"
                />
                <text className="diagram-label" x="800" y="128">
                  <tspan x="800">zero cross-split</tspan>
                  <tspan x="800" dy="28">
                    leakage
                  </tspan>
                  <tspan x="800" dy="28">
                    confirmed
                  </tspan>
                </text>
              </svg>
              <figcaption className="boundary">
                Newly drawn explanatory diagram from report-safe facts; not a
                reproduction of an internal figure.
              </figcaption>
            </figure>
          </section>

          <section className="chapter" id="internal-result">
            <p className="eyebrow">03 · Held-out internal result</p>
            <h2>Lower contamination, with a recovery tradeoff</h2>
            <figure className="case-figure case-figure-breakout">
              <picture>
                <source
                  media="(max-width: 540px)"
                  srcSet={sitePath(
                    "/quickbin/heldout-contamination-mobile.svg",
                  )}
                />
                <img
                  src={sitePath("/quickbin/heldout-contamination.png")}
                  width={2450}
                  height={915}
                  loading="lazy"
                  decoding="async"
                  alt="Horizontal bars compare contamination for the shipping network and both retrained networks on 279 validation genomes and on 299 test genomes held out before training. On test genomes, contamination decreases from 1.7530 for Shipping to 1.4690 for Champion, and further to 1.3724 for AM1. Contig recovery moves from 92.580 percent to 90.930 and 91.723 percent."
                />
              </picture>
              <figcaption>
                Genome-held-out validation and test splits. Lower
                contamination came with lower contig recovery; AM1 recovered
                more test contigs than the selected Champion while also
                lowering contamination further.
              </figcaption>
            </figure>
            <p>
              Both retrained models improved contamination control on the
              held-out internal splits. Recovery and Total Score showed why
              the result still had to be read as a tradeoff rather than a
              single-metric win.
            </p>
            <h3>A separate system comparison</h3>
            <p>
              On full scale2000 restricted to the same 62,694-contig
              shared-U2500 universe, all three QuickBin configurations scored
              above MetaBAT2. QuickBin with the selected candidate had the
              highest Total Score.
            </p>
            <table className="gate-table score-table">
              <caption className="visually-hidden">
                Total Score in the shared-U2500 system comparison
              </caption>
              <thead>
                <tr>
                  <th scope="col">System</th>
                  <th scope="col">Total Score</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">QuickBin · selected candidate</th>
                  <td>1431.16</td>
                </tr>
                <tr>
                  <th scope="row">QuickBin · AM1</th>
                  <td>1428.51</td>
                </tr>
                <tr>
                  <th scope="row">QuickBin · Shipping</th>
                  <td>1358.08</td>
                </tr>
                <tr>
                  <th scope="row">MetaBAT2 · seed 1</th>
                  <td>1135.43</td>
                </tr>
              </tbody>
            </table>
            <p className="boundary">
              This was one internal synthetic comparison; MetaBAT2 used seed
              1, with no multi-seed uncertainty estimate.
            </p>
          </section>

          <section className="chapter reversal" id="external-reversal">
            <p className="eyebrow">04 · External ordering reversal</p>
            <h2>Contamination held; the composite ranking changed</h2>
            <p>
              The external pipeline completed and graded all three networks
              on CAMI II PacBio sample 14. Both retrained models again
              reduced contamination, while Shipping retained the highest
              Total Score because the retrained models recovered less. The
              comparison involved one community and a changed QuickBin
              runtime, so it cannot isolate distribution shift from runtime
              differences.
            </p>
            <figure className="quickbin-diagram">
              <svg
                viewBox="0 0 900 320"
                role="img"
                aria-labelledby="reversal-diagram-title reversal-diagram-desc"
              >
                <title id="reversal-diagram-title">
                  Internal contamination improvement and external tradeoff
                </title>
                <desc id="reversal-diagram-desc">
                  The internal trace shows contamination decreasing from
                  Shipping 1.7530 to AM1 1.3724. The external CAMI II trace
                  shows Shipping retaining the highest Total Score while AM1
                  and the contamination-focused candidate had lower
                  contamination but lower Total Score, so the ordering did
                  not carry over.
                </desc>
                <defs>
                  <marker
                    id="internal-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                  >
                    <path
                      className="diagram-arrowhead"
                      d="M 0 0 L 10 5 L 0 10 z"
                    />
                  </marker>
                </defs>

                <text className="diagram-kicker" x="20" y="30">
                  Internal · contamination (lower is better)
                </text>
                <rect
                  className="diagram-box"
                  x="20"
                  y="50"
                  width="220"
                  height="80"
                />
                <text className="diagram-label" x="130" y="86">
                  <tspan x="130">Shipping</tspan>
                  <tspan x="130" dy="25">
                    1.7530
                  </tspan>
                </text>
                <path
                  className="diagram-line"
                  d="M 240 90 H 660"
                  markerEnd="url(#internal-arrow)"
                />
                <text className="diagram-small" x="450" y="76">
                  lower contamination
                </text>
                <rect
                  className="diagram-box diagram-confirmed"
                  x="660"
                  y="50"
                  width="220"
                  height="80"
                />
                <text className="diagram-label" x="770" y="86">
                  <tspan x="770">AM1</tspan>
                  <tspan x="770" dy="25">
                    1.3724
                  </tspan>
                </text>

                <text className="diagram-kicker" x="20" y="182">
                  External · CAMI II
                </text>
                <rect
                  className="diagram-box"
                  x="20"
                  y="200"
                  width="250"
                  height="80"
                />
                <text className="diagram-label" x="145" y="233">
                  <tspan x="145">Shipping</tspan>
                  <tspan className="diagram-small" x="145" dy="25">
                    highest Total Score
                  </tspan>
                </text>
                <path
                  className="diagram-line diagram-line-broken"
                  d="M 270 240 H 415 M 485 240 H 630"
                />
                <circle
                  className="diagram-break"
                  cx="450"
                  cy="240"
                  r="20"
                />
                <path
                  className="diagram-break-mark"
                  d="M 441 231 L 459 249 M 459 231 L 441 249"
                />
                <rect
                  className="diagram-box"
                  x="630"
                  y="200"
                  width="250"
                  height="80"
                />
                <text className="diagram-label" x="755" y="225">
                  <tspan x="755">Candidate / AM1</tspan>
                  <tspan className="diagram-small" x="755" dy="23">
                    lower contamination
                  </tspan>
                  <tspan className="diagram-small" x="755" dy="21">
                    lower Total Score
                  </tspan>
                </text>
                <text
                  className="diagram-break-label"
                  x="450"
                  y="300"
                >
                  ordering did not carry over
                </text>
              </svg>
              <figcaption className="boundary">
                Newly drawn explanatory diagram from report-safe facts; not a
                reproduction of an internal figure.
              </figcaption>
            </figure>
            <p className="boundary">
              External community: N = 1 · causal explanation remains
              unresolved.
            </p>
          </section>

          <section className="chapter" id="boundaries-next">
            <p className="eyebrow">05 · Boundaries and next test</p>
            <h2>My role in the project</h2>
            <dl className="provenance">
              <div>
                <dt>Pre-existing</dt>
                <dd>
                  QuickBin predated the internship, and so did the neural
                  framework and the grading infrastructure around it.
                </dd>
              </div>
              <div>
                <dt>Jason</dt>
                <dd>
                  I set the scientific direction and designed the benchmark
                  splits. I also wrote the validation contracts and made the
                  final interpretation calls.
                </dd>
              </div>
              <div>
                <dt>Codex</dt>
                <dd>
                  Codex handled implementation and cluster operation under
                  approval boundaries. Source tracing and verification runs
                  were also its work.
                </dd>
              </div>
              <div>
                <dt>Claude and mentorship</dt>
                <dd>
                  Claude supported the scientific review and the figure
                  drafts. Brian Bushnell provided design feedback and the
                  acceptance criteria.
                </dd>
              </div>
            </dl>
            <div className="boundary boundary-block">
              <p>Nothing from inside JGI appears on this page:</p>
              <ul className="boundary-list">
                <li>no JGI code or data</li>
                <li>no JGI models or internal figures</li>
                <li>no JGI reports or repository artifacts</li>
              </ul>
              <p>
                The figures are newly drawn from cleared facts and public
                sources.
              </p>
            </div>
            <h3>What a stronger test looks like</h3>
            <p>
              A stronger continuation would hold the runtime constant and add
              independently constructed PacBio communities. Swept operating
              curves would replace single points. With separate samples and
              frozen leakage-safe splits, a future CAMI-derived training
              expansion could then probe how broader training changes the
              recovery tradeoff without leaking into the protected external
              benchmark.
            </p>
            <p>
              The current result establishes a working external evaluation
              and repeatable contamination reduction. It does not yet
              establish the best composite operating point for independent
              communities.
            </p>
            <a
              className="card-link"
              href={sitePath("/work/tonal-inference/")}
            >
              Next case: another result that changed under a harder test →
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}
