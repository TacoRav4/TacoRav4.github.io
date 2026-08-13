import AudienceProjectGrid from "./audience-project-grid";

export default function Home() {
  return (
    <main className="page-shell" id="main">
      <AudienceProjectGrid />

      <section className="section" aria-labelledby="thread-title">
        <div className="section-heading">
          <h2 id="thread-title">One research thread</h2>
          <p>
            The two music projects ask how statistical structure becomes
            expectation—and how representation and evidence reshape the
            explanation.
          </p>
        </div>
        <div className="thread">
          <article>
            <p className="eyebrow">Corpus scale</p>
            <h3>Harmonic surprisal</h3>
            <p>Chord transitions, historical aggregation, and robustness.</p>
          </article>
          <span className="thread-link" aria-hidden="true">
            trace →
          </span>
          <article>
            <p className="eyebrow">Moment-to-moment</p>
            <h3>Tonal inference</h3>
            <p>Temporal belief, representation, and interpretable cues.</p>
          </article>
        </div>
      </section>

      <section
        className="section"
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className="section-heading">
          <h2 id="approach-title">How I work</h2>
          <p>
            The shared method matters more than a tool list. Each step leaves
            an inspectable contract or piece of evidence.
          </p>
        </div>
        <div className="method-grid">
          <article>
            <p className="section-number">01</p>
            <h3>Frame</h3>
            <p>Define the comparison and its evidence universe.</p>
          </article>
          <article>
            <p className="section-number">02</p>
            <h3>Build</h3>
            <p>Create a reproducible system and explicit contracts.</p>
          </article>
          <article>
            <p className="section-number">03</p>
            <h3>Stress</h3>
            <p>Test transfer, sensitivity, and failure modes.</p>
          </article>
          <article>
            <p className="section-number">04</p>
            <h3>Revise</h3>
            <p>Narrow the claim and explain what changed.</p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <div className="section-heading">
          <h2 id="skills-title">Demonstrated skills</h2>
          <p>Grouped by where they were used, not presented as a logo cloud.</p>
        </div>
        <div className="skill-grid">
          <article>
            <h3>Scientific ML</h3>
            <p>
              PyTorch, recurrent models, held-out evaluation, and benchmark
              design.
            </p>
          </article>
          <article>
            <h3>Data and statistics</h3>
            <p>Python, R, Pandas, Markov models, regression, and ANOVA.</p>
          </article>
          <article>
            <h3>Scientific systems</h3>
            <p>Java, Bash, Linux, Git, Slurm/HPC, and integration testing.</p>
          </article>
          <article>
            <h3>Bioinformatics</h3>
            <p>
              BBTools/QuickBin, minimap2, FASTA/SAM/TSV validation, and
              synthetic-genome benchmarks.
            </p>
          </article>
          <article>
            <h3>Research infrastructure</h3>
            <p>
              HTML/JavaScript, Django ORM, behavioral-study workflows, and
              data-integrity constraints.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="section-heading">
          <h2 id="about-title">About</h2>
          <p>
            Zihao (Jason) Zhang is an M.S. candidate in Cognitive and
            Information Sciences at UC Merced. He builds machine-learning and
            scientific software, then tests what improved, where it holds, and
            what evidence should come next. At the Joint Genome Institute, he
            designed leakage-safe PacBio training and evaluation workflows for
            neural metagenome binning. Both retrained models reduced
            contamination on held-out synthetic data and one external CAMI II
            community; a recovery tradeoff in that external test set the next
            validation questions. In computational music research, he studies
            how statistical structure becomes expectation, using model
            comparisons, representation analysis, and sensitivity checks to
            refine the explanation. His work combines reproducible pipelines,
            source-level debugging, and claims calibrated to the evidence.
          </p>
        </div>
      </section>
    </main>
  );
}
