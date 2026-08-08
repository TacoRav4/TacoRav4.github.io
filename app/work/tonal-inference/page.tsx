import { sitePath } from "../../site-path";

export default function TonalInferenceCaseStudy() {
  return (
    <main className="page-shell" id="main">
        <article>
          <header className="case-hero">
            <a className="back-link" href={sitePath("/#work")}>
              ← Back to selected work
            </a>
            <p className="eyebrow">
              Case study 02 · Research · Computational music
            </p>
            <h1>When better memory cannot fix a lossy representation</h1>
            <div className="case-summary">
              <p>
                I compared hand-coded temporal smoothing with a learned
                recurrent network for musical-key inference. The SRN improved
                accuracy on clean synthetic sequences, but real MIDI exposed a
                larger representation bottleneck and redirected the project
                toward interpretable musical cues.
              </p>
              <ul className="meta-list">
                <li>PyTorch · Elman SRN</li>
                <li>MIDI / chroma analysis</li>
                <li>Experimental design</li>
                <li>Sensitivity analysis</li>
              </ul>
            </div>
            <div className="proof">
              <span>
                synthetic overall accuracy: 0.8101 SRN / 0.7529 EMA+MLP
              </span>
            </div>
          </header>

          <div className="evidence-spine">
            <ol className="spine-labels" aria-label="Case-study sections">
              <li>Question</li>
              <li>Synthetic gain</li>
              <li>MIDI failure</li>
              <li>Diagnosis</li>
              <li>Sensitivity</li>
              <li>Narrow result</li>
              <li>Attribution</li>
              <li>Next question</li>
            </ol>

            <div className="evidence-sections">
              <section>
                <p className="eyebrow">01 · Cognitive question</p>
                <h2>How should tonal belief evolve through time?</h2>
                <p>
                  The controlled comparison placed a static MLP behind
                  hand-coded exponential smoothing, then compared it with an
                  Elman recurrent network that learned temporal state.
                </p>
              </section>

              <section>
                <p className="eyebrow">
                  02 · Controlled synthetic comparison
                </p>
                <h2>Learned recurrence improved two accuracy measures</h2>
                <div
                  className="comparison"
                  aria-label="Synthetic overall accuracy comparison"
                >
                  <div className="metric">
                    EMA + MLP<strong>0.7529</strong>
                  </div>
                  <span className="arrow" aria-hidden="true">
                    →
                  </span>
                  <div className="metric">
                    Elman SRN<strong>0.8101</strong>
                  </div>
                </div>
                <p>
                  The SRN also improved modulation accuracy. The EMA baseline
                  had slightly better modulation lag and switch-failure rate, so
                  the comparison did not produce a winner on every metric.
                </p>
                <p className="boundary">
                  These values are synthetic labeled accuracy, not real-MIDI
                  accuracy.
                </p>
              </section>

              <section className="reversal">
                <p className="eyebrow">03 · Harder setting</p>
                <h2>The gain did not transfer cleanly to real MIDI</h2>
                <p>
                  The SRN became smoother and more confident without correcting
                  the dominant tonic/key bias. Because dense ground truth was
                  not available, this stage is a descriptive behavior analysis
                  rather than a timestep accuracy test.
                </p>
                <figure className="case-figure">
                  <img
                    src={sitePath("/tonal/circle-of-fifths-ema-vs-srn.png")}
                    width="1959"
                    height="994"
                    loading="lazy"
                    decoding="async"
                    alt="Side-by-side Circle-of-Fifths walks for EMA and SRN on the Twinkle 12 MIDI excerpt, showing different key trajectories that both end near F."
                  />
                  <figcaption>
                    Descriptive real-MIDI behavior, not an accuracy comparison:
                    learned recurrence changed the path and confidence without
                    resolving the dominant tonal bias.
                  </figcaption>
                </figure>
              </section>

              <section>
                <p className="eyebrow">04 · Representation diagnosis</p>
                <h2>Information was lost before memory could use it</h2>
                <p>
                  Hard triadic chord forcing and major-first tie behavior
                  discarded or biased tonal evidence upstream. This changed the
                  research question from “Which memory is better?” to “What
                  representation preserves the evidence memory needs?”
                </p>
              </section>

              <section>
                <p className="eyebrow">05 · Recovery versus stability</p>
                <h2>Fifty-four conditions mapped a tradeoff frontier</h2>
                <p>
                  A predeclared sensitivity grid tested whether recovery could
                  improve without damaging stable behavior. The result exposed
                  a Pareto tradeoff rather than a free improvement.
                </p>
                <figure className="case-figure case-figure-narrow">
                  <img
                    src={sitePath("/tonal/gate-sensitivity-pareto.png")}
                    width="1166"
                    height="952"
                    loading="lazy"
                    decoding="async"
                    alt="Scatter plot of 54 predeclared settings with the Pareto frontier marked, comparing higher minor-mode recovery against lower stability damage."
                  />
                  <figcaption>
                    The frontier makes the tradeoff visible: configurations
                    with greater minor-mode recovery generally incurred more
                    stability damage. Dotted bars are narrative reference
                    thresholds, not model-selection rules.
                  </figcaption>
                </figure>
              </section>

              <section>
                <p className="eyebrow">06 · Narrow leading-tone result</p>
                <h2>
                  An interpretable cue recovered part of the minor-key signal
                </h2>
                <p>
                  A leading-tone-only resolver changed strict minor-key
                  proportions from 0 to 0.2925 for the Für Elise excerpt and
                  from 0 to 0.4074 for the Chopin prelude.
                </p>
                <p className="boundary">
                  This is partial coverage, not general recovery. Most
                  minor-piece windows remained unresolved, and the control
                  corpus lacked a valid held-out mechanism-targeted adversarial
                  example.
                </p>
              </section>

              <section>
                <p className="eyebrow">
                  07 · Contribution and AI assistance
                </p>
                <h2>The workflow is part of the evidence</h2>
                <div className="contribution-grid">
                  <article>
                    <h3>Jason</h3>
                    <p>
                      Research direction, phase boundaries, musical segmentation
                      decisions, interpretation, and final authority.
                    </p>
                  </article>
                  <article>
                    <h3>AI assistance</h3>
                    <p>
                      Planning, implementation, verification, and independent
                      review involving Claude and Codex.
                    </p>
                  </article>
                </div>
                <p>
                  The public commit is Jason-authored and credits Claude Sonnet
                  5 as co-author. Public wording describes an AI-assisted
                  research workflow rather than implying every line was written
                  unaided.
                </p>
              </section>

              <section>
                <p className="eyebrow">08 · Next research question</p>
                <h2>
                  What representation retains interpretable musical evidence?
                </h2>
                <p>
                  The next step is not simply a larger recurrent model. It is a
                  representation and evaluation design that preserves musical
                  cues, supports stronger negative controls, and keeps synthetic
                  accuracy separate from descriptive corpus behavior.
                </p>
                <a className="card-link" href={sitePath("/#work")}>
                  Related project: harmonic surprisal at corpus scale →
                </a>
              </section>
            </div>
          </div>
        </article>
    </main>
  );
}
