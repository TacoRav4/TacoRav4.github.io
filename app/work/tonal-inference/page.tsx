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
          <h1>Better memory could not fix a lossy representation</h1>
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
          <div className="proof case-proof">
            <span>
              synthetic overall accuracy: 0.8101 SRN / 0.7529 EMA+MLP
            </span>
          </div>
        </header>

        <nav className="chapter-row" aria-label="Case-study chapters">
          <ol>
            <li>
              <a href="#question">Research question</a>
            </li>
            <li>
              <a href="#synthetic">Synthetic comparison</a>
            </li>
            <li>
              <a href="#midi-failure">Real-MIDI failure</a>
            </li>
            <li>
              <a href="#diagnosis">Diagnosis and sensitivity</a>
            </li>
            <li>
              <a href="#attribution-next">Attribution and next question</a>
            </li>
          </ol>
        </nav>

        <div className="case-body">
          <section className="chapter" id="question">
            <p className="eyebrow">01 · Research question</p>
            <h2>How should tonal belief evolve through time?</h2>
            <p>
              The controlled comparison placed a static MLP behind hand-coded
              exponential smoothing, then compared it with an Elman recurrent
              network that learned its own temporal state. Same task, same
              inputs — the only difference was where the memory came from.
            </p>
          </section>

          <section className="chapter" id="synthetic">
            <p className="eyebrow">02 · Controlled synthetic comparison</p>
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
              The SRN also improved modulation accuracy. The EMA baseline had
              slightly better modulation lag and switch-failure rate, so the
              comparison did not produce a winner on every metric.
            </p>
            <p className="boundary">
              These values are synthetic labeled accuracy, not real-MIDI
              accuracy.
            </p>
          </section>

          <section className="chapter reversal" id="midi-failure">
            <p className="eyebrow">03 · Real-MIDI failure</p>
            <h2>The gain did not transfer cleanly to real MIDI</h2>
            <p>
              The SRN became smoother and more confident without correcting
              the dominant tonic/key bias. Because dense ground truth was not
              available, this stage is a descriptive behavior analysis rather
              than a timestep accuracy test.
            </p>
            <figure className="case-figure case-figure-breakout">
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

          <section className="chapter" id="diagnosis">
            <p className="eyebrow">04 · Diagnosis and sensitivity</p>
            <h2>Information was lost before memory could use it</h2>
            <p>
              Hard triadic chord forcing and major-first tie behavior
              discarded or biased tonal evidence upstream. This changed the
              research question from &ldquo;Which memory is better?&rdquo; to
              &ldquo;What representation preserves the evidence memory
              needs?&rdquo;
            </p>
            <p>
              A predeclared sensitivity grid of 54 conditions then tested
              whether recovery could improve without damaging stable
              behavior. The answer was a Pareto frontier, not a free
              improvement.
            </p>
            <figure className="case-figure">
              <img
                src={sitePath("/tonal/gate-sensitivity-pareto.png")}
                width="1166"
                height="952"
                loading="lazy"
                decoding="async"
                alt="Scatter plot of 54 predeclared settings with the Pareto frontier marked, comparing higher minor-mode recovery against lower stability damage."
              />
              <figcaption>
                The frontier makes the tradeoff visible: configurations with
                greater minor-mode recovery generally incurred more stability
                damage. Dotted bars are narrative reference thresholds, not
                model-selection rules.
              </figcaption>
            </figure>
            <p>
              One interpretable cue did recover part of the signal. A
              leading-tone-only resolver changed strict minor-key proportions
              from 0 to 0.2925 for the Für Elise excerpt and from 0 to 0.4074
              for the Chopin prelude.
            </p>
            <p className="boundary">
              This is partial coverage, not general recovery. Most
              minor-piece windows remained unresolved, and the control corpus
              lacked a valid held-out mechanism-targeted adversarial example.
            </p>
          </section>

          <section className="chapter" id="attribution-next">
            <p className="eyebrow">05 · Attribution and next question</p>
            <h2>The workflow is part of the evidence</h2>
            <dl className="provenance">
              <div>
                <dt>Jason</dt>
                <dd>
                  I set the research direction and the phase boundaries. The
                  musical segmentation calls and the final interpretation are
                  mine.
                </dd>
              </div>
              <div>
                <dt>AI assistance</dt>
                <dd>
                  Claude and Codex handled much of the implementation, with
                  independent review between them.
                </dd>
              </div>
            </dl>
            <p>
              The public commit is mine and credits Claude Sonnet 5 as
              co-author. The wording describes an AI-assisted research
              workflow rather than implying every line was written unaided.
            </p>
            <h3>What representation retains interpretable musical evidence?</h3>
            <p>
              The next step is not simply a larger recurrent model. It is a
              representation that preserves the musical cues, paired with an
              evaluation design strong enough for real negative controls.
              Synthetic accuracy stays separate from descriptive corpus
              behavior either way.
            </p>
            <a className="card-link" href={sitePath("/#work")}>
              Related project: harmonic surprisal at corpus scale →
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}
