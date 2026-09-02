import type { CSSProperties } from "react";

import { sitePath } from "../../site-path";

function ResponsiveFigure({
  src,
  mobileSrc,
  mobileWidth,
  mobileHeight,
  width,
  height,
  alt,
  caption,
}: {
  src: string;
  mobileSrc?: string;
  mobileWidth?: number;
  mobileHeight?: number;
  width: number;
  height: number;
  alt: string;
  caption: string;
}) {
  const figureStyle =
    mobileWidth && mobileHeight
      ? ({
          "--case-figure-ratio": `${width} / ${height}`,
          "--case-figure-mobile-ratio": `${mobileWidth} / ${mobileHeight}`,
        } as CSSProperties)
      : undefined;

  return (
    <figure
      className={`case-figure case-figure-breakout case-figure-screenshot${figureStyle ? " case-figure-responsive" : ""}`}
      style={figureStyle}
    >
      <picture>
        {mobileSrc ? (
          <source media="(max-width: 540px)" srcSet={sitePath(mobileSrc)} />
        ) : null}
        <img
          src={sitePath(src)}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          alt={alt}
        />
      </picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function StructuredReviewLabCaseStudy() {
  return (
    <main className="page-shell" id="main">
      <article>
        <header className="case-hero">
          <a className="back-link" href={sitePath("/#work")}>
            ← Back to selected work
          </a>
          <p className="eyebrow">Case study 06 · Software · AI workflow</p>
          <h1>A document-review workflow that can refuse to guess</h1>
          <div className="case-summary">
            <p>
              I built a local-first document-review workflow with
              React/TypeScript on the frontend and FastAPI/Pydantic on the
              backend. A Mock or OpenAI provider must return a fixed review
              shape. The service checks every evidence excerpt against the
              source text before it shows a result. Invalid output gets one
              bounded retry, then a safe human-review state.
            </p>
            <ul className="meta-list">
              <li>React</li>
              <li>TypeScript</li>
              <li>FastAPI</li>
              <li>Pydantic</li>
              <li>OpenAI Responses API</li>
              <li>Deterministic Mock provider</li>
              <li>Evidence grounding</li>
            </ul>
          </div>
          <div className="proof case-proof">
            <span>Mock: 20 synthetic fixtures · deterministic evaluation</span>
            <span>
              Live: 2 synthetic fixtures · gpt-5.6-luna · 2,608.8 ms mean/p50
            </span>
          </div>
        </header>

        <nav className="chapter-row" aria-label="Case-study chapters">
          <ol>
            <li>
              <a href="#workflow">The workflow</a>
            </li>
            <li>
              <a href="#success">Normal result</a>
            </li>
            <li>
              <a href="#human-review">Human review</a>
            </li>
            <li>
              <a href="#reliability">Reliability rules</a>
            </li>
            <li>
              <a href="#validation">Validation</a>
            </li>
            <li>
              <a href="#boundaries">Boundaries</a>
            </li>
          </ol>
        </nav>

        <div className="case-body">
          <section className="chapter" id="workflow">
            <p className="eyebrow">01 · The workflow</p>
            <h2>The same checks sit between provider and screen</h2>
            <p>
              The browser sends a synthetic document to the backend. The
              service selects the deterministic Mock provider or the OpenAI
              Responses API. Both paths target the same Pydantic{" "}
              <code>StructuredReview</code> contract.
            </p>
            <figure className="case-figure case-figure-breakout">
              <picture>
                <source
                  media="(max-width: 540px)"
                  srcSet={sitePath("/structured-review/review-flow-mobile.svg")}
                />
                <img
                  src={sitePath("/structured-review/review-flow.svg")}
                  width="1200"
                  height="430"
                  loading="lazy"
                  decoding="async"
                  alt="Flow diagram of a synthetic document moving from a Mock or OpenAI provider through Pydantic parsing. Exact-substring evidence checks lead to a validated result or human review."
                />
              </picture>
              <figcaption>
                Drawn from the current provider and validation path. It shows
                the boundary before a result reaches the screen.
              </figcaption>
            </figure>
            <ul className="boundary-list">
              <li>The response must fit the shared StructuredReview model.</li>
              <li>Each evidence value must appear exactly in the input text.</li>
              <li>Invalid structured output can receive one correction retry.</li>
              <li>Provider failures return a safe needs_review response.</li>
            </ul>
          </section>

          <section className="chapter" id="success">
            <p className="eyebrow">02 · Normal result</p>
            <h2>A normal result keeps the evidence visible</h2>
            <p>
              The success view keeps the summary beside each finding. The
              evidence excerpt remains tied to the source document instead of
              becoming a free-floating explanation.
            </p>
            <ResponsiveFigure
              src="/structured-review/normal-result.png"
              mobileSrc="/structured-review/normal-result-mobile.png"
              mobileWidth={360}
              mobileHeight={812}
              width={2670}
              height={1490}
              alt="Structured Review Lab Mock result for the release-brief synthetic document. The page shows a validated summary. Findings retain source evidence and model-reported confidence. No human-review banner is visible."
              caption="Mock mode. The release-brief fixture uses synthetic input. This result passed the schema and evidence checks. Confidence is model-reported and not calibrated."
            />
          </section>

          <section className="chapter reversal" id="human-review">
            <p className="eyebrow">03 · Human review</p>
            <h2>A valid finding can still ask for a person</h2>
            <p>
              The open-question and warehouse-rehearsal fixtures contain
              grounded findings that need a person in the loop. Both responses
              are valid, yet the service keeps the human-review flag visible so
              a person can decide what happens next.
            </p>
            <ResponsiveFigure
              src="/structured-review/question-review.png"
              mobileSrc="/structured-review/question-review-mobile.png"
              mobileWidth={360}
              mobileHeight={812}
              width={2814}
              height={1584}
              alt="Structured Review Lab Mock result for the open-question synthetic document. The page shows a grounded question and a visible Human review required status."
              caption="Mock mode. The open-question fixture keeps a grounded question visible for a person to resolve. This is a valid status: ok response with needs_human_review: true."
            />
            <ResponsiveFigure
              src="/structured-review/human-review-required.png"
              mobileSrc="/structured-review/human-review-required-mobile.png"
              mobileWidth={360}
              mobileHeight={812}
              width={2768}
              height={1574}
              alt="Structured Review Lab Mock result for the warehouse-rehearsal synthetic document. The page shows a grounded risk finding and a visible Human review required status."
              caption="Mock mode. The warehouse-rehearsal fixture uses synthetic input. This is a valid status: ok response with needs_human_review: true. It is not the provider-failure fallback."
            />
            <p className="boundary">
              Provider failure or invalid output uses status: needs_review and
              a safe fallback. The page does not present that path as a valid
              analysis.
            </p>
          </section>

          <section className="chapter" id="reliability">
            <p className="eyebrow">04 · Reliability rules</p>
            <h2>Reliability is a small set of explicit rules</h2>
            <div className="method-grid">
              <article>
                <h3>Shared contract</h3>
                <p>
                  Pydantic models reject extra fields. They enforce supported
                  kinds and finite confidence. List sizes stay bounded.
                </p>
              </article>
              <article>
                <h3>Evidence grounding</h3>
                <p>
                  The server checks each evidence value as an exact substring
                  of the original document before returning a successful
                  result.
                </p>
              </article>
              <article>
                <h3>Bounded retry</h3>
                <p>
                  Invalid provider output gets at most one correction retry.
                  The service cannot loop indefinitely while waiting for a
                  better answer.
                </p>
              </article>
              <article>
                <h3>Safe fallback</h3>
                <p>
                  Timeouts and provider errors become a needs_review response.
                  Documents are not persisted in a database.
                </p>
              </article>
            </div>
          </section>

          <section className="chapter" id="validation">
            <p className="eyebrow">05 · Validation</p>
            <h2>Deterministic control and live smoke test stay separate</h2>
            <p>
              The Mock path checks the application contract with repeatable
              synthetic fixtures. The live path checks the OpenAI adapter on a
              much smaller sample. Their results answer different questions.
            </p>
            <div className="comparison" aria-label="Mock and live validation comparison">
              <article className="metric">
                <h3>Mock evaluation</h3>
                <p>20 synthetic fixtures with a deterministic tag-based provider.</p>
                <p>Schema validity: 1.0.</p>
                <p>Evidence grounding: 1.0.</p>
                <p>Review precision: 1.0.</p>
                <p>Review recall: 1.0.</p>
                <p>These are control-path results, not model-accuracy results.</p>
              </article>
              <span className="arrow" aria-hidden="true">
                vs
              </span>
              <article className="metric">
                <h3>Recorded live smoke test</h3>
                <p>Two synthetic fixtures using gpt-5.6-luna.</p>
                <p>Schema validity: 1.0.</p>
                <p>Evidence grounding: 1.0.</p>
                <p>Review precision: 1.0.</p>
                <p>Review recall: 1.0.</p>
                <p>Mean and p50 latency: 2,608.8 ms.</p>
                <p>Two cases cannot establish broad accuracy or production performance.</p>
              </article>
            </div>
          </section>

          <section className="chapter" id="boundaries">
            <p className="eyebrow">06 · Boundaries</p>
            <h2>The page stops where the evidence stops</h2>
            <dl className="provenance">
              <div>
                <dt>Project status</dt>
                <dd>
                  This is a local candidate. The project has no production
                  deployment or real users.
                </dd>
              </div>
              <div>
                <dt>Document scope</dt>
                <dd>
                  The examples are synthetic business documents. This is not a
                  healthcare product. It is not an EHR or a clinical product.
                </dd>
              </div>
              <div>
                <dt>Confidence</dt>
                <dd>
                  Confidence is reported by the model. It is not a calibrated
                  probability.
                </dd>
              </div>
              <div>
                <dt>Network boundary</dt>
                <dd>
                  Local-first does not mean fully offline. OpenAI mode sends
                  the input document to the API.
                </dd>
              </div>
              <div>
                <dt>Source link</dt>
                <dd>
                  There is no source link yet because the project is not a
                  public Git repository.
                </dd>
              </div>
            </dl>
            <p className="case-takeaway">
              A model response is only the beginning. The useful work is the
              validation boundary that decides whether it can be shown.
            </p>
            <a
              className="card-link case-return-link"
              href={sitePath("/#work")}
            >
              Back to selected work →
            </a>
          </section>
        </div>
      </article>
    </main>
  );
}
