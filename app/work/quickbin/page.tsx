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
                viewBox="0 0 970 300"
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
                  d="M 210 150 H 260"
                  markerEnd="url(#split-arrow)"
                />

                <rect
                  className="diagram-box"
                  x="270"
                  y="40"
                  width="160"
                  height="60"
                />
                <text className="diagram-label" x="350" y="76">
                  1,435 train
                </text>
                <rect
                  className="diagram-box"
                  x="270"
                  y="120"
                  width="160"
                  height="60"
                />
                <text className="diagram-label" x="350" y="156">
                  279 validation
                </text>
                <rect
                  className="diagram-box"
                  x="270"
                  y="200"
                  width="160"
                  height="60"
                />
                <text className="diagram-label" x="350" y="236">
                  299 evaluation
                </text>

                <path
                  className="diagram-line"
                  d="M 430 150 H 480"
                  markerEnd="url(#split-arrow)"
                />

                <rect
                  className="diagram-box"
                  x="490"
                  y="80"
                  width="200"
                  height="140"
                />
                <text className="diagram-label" x="590" y="128">
                  <tspan x="590">training examples</tspan>
                  <tspan x="590" dy="28">
                    generated
                  </tspan>
                  <tspan className="diagram-small" x="590" dy="26">
                    train-only
                  </tspan>
                </text>

                <path
                  className="diagram-line"
                  d="M 690 150 H 740"
                  markerEnd="url(#split-arrow)"
                />

                <rect
                  className="diagram-box diagram-confirmed"
                  x="750"
                  y="80"
                  width="200"
                  height="140"
                />
                <text className="diagram-label" x="850" y="128">
                  <tspan x="850">zero cross-split</tspan>
                  <tspan x="850" dy="28">
                    leakage
                  </tspan>
                  <tspan x="850" dy="28">
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
            <h2>
              The Total Score leader changed: AM1 internally, Shipping on CAMI
              II
            </h2>
            <p>
              The internal genome-held-out evaluation ranked AM1 first by Total
              Score. The contamination-focused candidate ranked second, with
              Shipping third. On CAMI II PacBio sample 14, Shipping ranked
              first. AM1 ranked second, while the contamination-focused
              candidate ranked third. Both retrained models reduced
              contamination, but gave up enough recovery that Shipping
              retained the highest Total Score. Because CAMI changed the
              dataset and truth universe while the QuickBin runtime also
              changed, this reversal does not isolate distribution shift.
            </p>
            <figure className="quickbin-diagram">
              <svg
                viewBox="0 0 900 360"
                role="img"
                aria-labelledby="reversal-diagram-title reversal-diagram-desc"
              >
                <title id="reversal-diagram-title">
                  Internal and external Total Score rankings
                </title>
                <desc id="reversal-diagram-desc">
                  Two rows compare within-context Total Score rankings. On the
                  scale2000 genome-held-out evaluation, AM1 ranks first,
                  contamination-focused candidate second, and Shipping third.
                  On CAMI II sample 14, Shipping ranks first, AM1 second, and
                  contamination-focused candidate third. The rows show order
                  only; raw Total Scores are not comparable across contexts.
                </desc>
                <defs>
                  <marker
                    id="reversal-arrow"
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
                  Rank 1 → Rank 3 · higher Total Score to lower Total Score
                </text>
                <text className="diagram-kicker" x="20" y="58">
                  Internal · scale2000 evaluation · Total Score
                </text>
                <text className="diagram-small" x="190" y="84">
                  Rank 1
                </text>
                <text className="diagram-small" x="450" y="84">
                  Rank 2
                </text>
                <text className="diagram-small" x="710" y="84">
                  Rank 3
                </text>
                <rect
                  className="diagram-box diagram-confirmed"
                  x="100"
                  y="95"
                  width="180"
                  height="70"
                />
                <text className="diagram-label" x="190" y="137">
                  AM1
                </text>
                <path
                  className="diagram-line"
                  d="M 280 130 H 340"
                  markerEnd="url(#reversal-arrow)"
                />
                <rect
                  className="diagram-box"
                  x="360"
                  y="95"
                  width="180"
                  height="70"
                />
                <text className="diagram-label" x="450" y="137">
                  Candidate
                </text>
                <path
                  className="diagram-line"
                  d="M 540 130 H 600"
                  markerEnd="url(#reversal-arrow)"
                />
                <rect
                  className="diagram-box"
                  x="620"
                  y="95"
                  width="180"
                  height="70"
                />
                <text className="diagram-label" x="710" y="137">
                  Shipping
                </text>

                <text className="diagram-break-label" x="450" y="196">
                  Shipping: Rank 3 → Rank 1 on CAMI II
                </text>

                <text className="diagram-kicker" x="20" y="232">
                  External · CAMI II sample 14 · Total Score
                </text>
                <text className="diagram-small" x="190" y="258">
                  Rank 1
                </text>
                <text className="diagram-small" x="450" y="258">
                  Rank 2
                </text>
                <text className="diagram-small" x="710" y="258">
                  Rank 3
                </text>
                <rect
                  className="diagram-box diagram-confirmed"
                  x="100"
                  y="269"
                  width="180"
                  height="70"
                />
                <text className="diagram-label" x="190" y="311">
                  Shipping
                </text>
                <path
                  className="diagram-line"
                  d="M 280 304 H 340"
                  markerEnd="url(#reversal-arrow)"
                />
                <rect
                  className="diagram-box"
                  x="360"
                  y="269"
                  width="180"
                  height="70"
                />
                <text className="diagram-label" x="450" y="311">
                  AM1
                </text>
                <path
                  className="diagram-line"
                  d="M 540 304 H 600"
                  markerEnd="url(#reversal-arrow)"
                />
                <rect
                  className="diagram-box"
                  x="620"
                  y="269"
                  width="180"
                  height="70"
                />
                <text className="diagram-label" x="710" y="311">
                  Candidate
                </text>
              </svg>
              <figcaption className="boundary">
                Within-context Total Score ordering only. CAMI II uses one
                external community (N = 1), and its dataset and truth
                universe differ from the internal benchmark while the
                QuickBin runtime also changed.
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
