import { sitePath } from "../../site-path";

export default function HarmonicSurprisalCaseStudy() {
  return (
    <main className="page-shell" id="main">
      <article>
        <header className="case-hero">
          <a className="back-link" href={sitePath("/#work")}>
            ← Back to selected work
          </a>
          <p className="eyebrow">Case study 05 · Data · Music cognition</p>
          <h1>Harmonic surprisal across a century of popular music</h1>
          <div className="case-summary">
            <p>
              I reconstructed an R analysis of symbolic chord sequences and
              tested whether harmonic surprisal followed a Wundt-like
              inverted-U over time. The first unweighted fit suggested one.
              Weighting by decade sample size or inverse variance removed the
              in-range curve. The project became a test of robustness rather
              than a confirmation of the original hypothesis.
            </p>
            <ul className="meta-list">
              <li>R</li>
              <li>Markov modeling</li>
              <li>Information theory</li>
              <li>Sensitivity analysis</li>
            </ul>
          </div>
          <div className="proof case-proof">
            <span>667,858 rows · 277,925 songs · 12 decades</span>
            <span>weighted fits removed the apparent inverted-U</span>
          </div>
        </header>

        <nav className="chapter-row" aria-label="Case-study chapters">
          <ol>
            <li>
              <a href="#question">The question</a>
            </li>
            <li>
              <a href="#process">Analysis process</a>
            </li>
            <li>
              <a href="#debugging">Sensitivity check</a>
            </li>
            <li>
              <a href="#result">Results</a>
            </li>
            <li>
              <a href="#interpretation">Interpretation</a>
            </li>
            <li>
              <a href="#attribution">Attribution and data boundary</a>
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
            <h2>Can a large corpus support the curve?</h2>
            <p>
              Wundt-like accounts of pleasure and complexity suggest that
              moderate surprise may be especially engaging. I asked whether
              popular music showed a related pattern in harmonic surprisal
              across historical time.
            </p>
            <p>
              The observable quantity was symbolic chord structure. It was not
              a direct measure of listener preference.
            </p>
          </section>

          <section className="chapter" id="process">
            <p className="eyebrow">02 · Analysis process</p>
            <h2>Turn chord transitions into surprisal</h2>
            <p>
              The final R workflow was reconstructed from code embedded in the
              knitted project PDF. It turns each song into adjacent chord
              transitions. It estimates their probabilities. It summarizes
              the resulting surprise at song level.
            </p>
            <ol className="boundary-list">
              <li>Rows missing genre or decade were removed.</li>
              <li>Structural tags such as &lt;intro_1&gt; were stripped.</li>
              <li>Each song became a sequence of adjacent chord transitions.</li>
              <li>Transition probabilities became surprisal through -log2(p).</li>
            </ol>
            <figure className="case-figure case-figure-breakout">
              <img
                src={sitePath("/harmonic/surprisal-over-time.png")}
                width="1440"
                height="972"
                loading="lazy"
                decoding="async"
                alt="A chart shows decadal mean harmonic surprisal with an unweighted quadratic fit across the observed years."
              />
              <figcaption>
                The initial unweighted view suggested a curve that rose before
                it fell.
              </figcaption>
            </figure>
          </section>

          <section className="chapter reversal" id="debugging">
            <p className="eyebrow">03 · Sensitivity check</p>
            <h2>The first curve was sensitive to sample size</h2>
            <p>
              The temporal model used 12 decadal observations. Their sample
              sizes ranged from 22 songs in 1900 to 113,376 songs in 2010.
              Equal weighting gave each decade the same influence despite that
              difference.
            </p>
            <figure className="case-figure case-figure-breakout">
              <img
                src={sitePath("/harmonic/temporal-sensitivity.png")}
                width="1512"
                height="1080"
                loading="lazy"
                decoding="async"
                alt="A temporal sensitivity chart compares an unweighted fit with fits weighted by songs per decade and inverse variance. Point size reflects song count."
              />
              <figcaption>
                Point size reflects song count. The weighted fits remove the
                in-range inverted-U.
              </figcaption>
            </figure>
            <p className="boundary">
              The curve was reproducible as an unweighted result. It was not
              robust to the weighting checks.
            </p>
          </section>

          <section className="chapter" id="result">
            <p className="eyebrow">04 · Results</p>
            <h2>Weighting changed the temporal conclusion</h2>
            <div className="case-table-wrap">
              <table className="gate-table">
                <thead>
                  <tr>
                    <th scope="col">Fit</th>
                    <th scope="col">R²</th>
                    <th scope="col">Quadratic term</th>
                    <th scope="col">Observed shape</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Unweighted</th>
                    <td>0.4604</td>
                    <td>p = 0.0231</td>
                    <td>Inverted-U in range</td>
                  </tr>
                  <tr>
                    <th scope="row">Songs per decade</th>
                    <td>0.658</td>
                    <td>p = 0.5457</td>
                    <td>Decreasing in range</td>
                  </tr>
                  <tr>
                    <th scope="row">Inverse variance</th>
                    <td>0.602</td>
                    <td>p = 0.7671</td>
                    <td>Decreasing in range</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The unweighted model reproduced the reported temporal fit with
              R² = 0.4604 and p = 0.06225. Neither weighted model retained an
              in-range inverted-U.
            </p>
            <p>
              The genre analysis also detected differences in surprisal
              variability across six common genres. That result belongs to a
              separate comparison from the temporal curve.
            </p>
          </section>

          <section className="chapter" id="interpretation">
            <p className="eyebrow">05 · Interpretation</p>
            <h2>A detectable difference can still be small</h2>
            <p>
              Rock and Pop Rock had higher median surprisal variability in the
              reported genre comparison. Punk and Country had lower median
              variability. Several distributions overlapped substantially.
            </p>
            <p>
              The analysis supports a narrower conclusion about how sampling
              choices shape the temporal pattern. It does not establish a
              general theory of listener preference.
            </p>
          </section>

          <section className="chapter" id="attribution">
            <p className="eyebrow">06 · Attribution and data boundary</p>
            <h2>The workflow is reproducible locally, not turnkey publicly</h2>
            <dl className="provenance">
              <div>
                <dt>Jason&apos;s role</dt>
                <dd>
                  I set the research question and reconstructed the analysis
                  workflow. I chose the weighting sensitivity check and the
                  final interpretation.
                </dd>
              </div>
              <div>
                <dt>Source material</dt>
                <dd>
                  The analysis came from Jason&apos;s COGS 210 project and its
                  knitted PDF. The Chordonomicon corpus is third-party data.
                </dd>
              </div>
              <div>
                <dt>AI assistance</dt>
                <dd>
                  Codex supported the R workflow reconstruction and
                  verification. The page does not imply that every line was
                  written unaided.
                </dd>
              </div>
            </dl>
            <p>
              The project is documented through the{" "}
              <a href="https://arxiv.org/abs/2410.22046">Chordonomicon paper</a>.
              The{" "}
              <a href="https://github.com/spyroskantarelis/chordonomicon">
                source repository
              </a>{" "}
              and{" "}
              <a href="https://huggingface.co/datasets/ailsntua/Chordonomicon">
                dataset page
              </a>
              are linked separately. The repository uses Apache-2.0 for code.
              The dataset page currently identifies the corpus as CC BY-NC-4.0.
              The raw CSV remains outside this site.
            </p>
            <p className="boundary">
              Code terms and dataset terms are separate. This page offers no
              raw-data download and makes no turnkey reproduction claim.
            </p>
          </section>

          <section className="chapter reversal" id="takeaway">
            <p className="eyebrow">07 · Takeaway</p>
            <h2>The apparent curve did not survive a fairer comparison</h2>
            <p className="case-takeaway reversal">
              The strongest result is not the original inverted-U. It is that
              the apparent curve changed when unequal decade representation was
              taken seriously.
            </p>
          </section>

          <section className="chapter" id="future">
            <p className="eyebrow">08 · Future direction</p>
            <h2>Replicate the question on a documented public version</h2>
            <p>
              A future public reproduction would need a permitted dataset
              version and a recorded environment. It should keep the 12-decade
              sensitivity visible if the public rows differ from the local
              corpus.
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
