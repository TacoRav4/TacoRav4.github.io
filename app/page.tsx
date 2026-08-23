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
            <p>How chord statistics drift across a century of songs.</p>
          </article>
          <span className="thread-link" aria-hidden="true">
            trace →
          </span>
          <article>
            <p className="eyebrow">Moment-to-moment</p>
            <h3>Tonal inference</h3>
            <p>How belief about the key should evolve as music unfolds.</p>
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
            The method matters more than the tool list. Each step leaves
            something another person can check.
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
            <p>Push the result somewhere harder and watch what breaks.</p>
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
            <ul className="skill-list">
              <li>PyTorch and recurrent models</li>
              <li>Held-out evaluation</li>
              <li>Benchmark design</li>
            </ul>
          </article>
          <article>
            <h3>Data and statistics</h3>
            <ul className="skill-list">
              <li>Python and Pandas</li>
              <li>R</li>
              <li>Regression and ANOVA</li>
              <li>Markov models</li>
            </ul>
          </article>
          <article>
            <h3>Scientific systems</h3>
            <ul className="skill-list">
              <li>Java</li>
              <li>Bash and Linux</li>
              <li>Git and Slurm/HPC</li>
              <li>Integration testing</li>
            </ul>
          </article>
          <article>
            <h3>Bioinformatics</h3>
            <ul className="skill-list">
              <li>BBTools/QuickBin and minimap2</li>
              <li>FASTA/SAM/TSV validation</li>
              <li>Synthetic-genome benchmarks</li>
            </ul>
          </article>
          <article>
            <h3>Research infrastructure</h3>
            <ul className="skill-list">
              <li>HTML/JavaScript</li>
              <li>Django ORM</li>
              <li>Behavioral-study workflows</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section" id="about" aria-labelledby="about-title">
        <div className="section-heading">
          <h2 id="about-title">About</h2>
          <p>
            I&apos;m an M.S. candidate in Cognitive and Information Sciences at
            UC Merced. Most of my work starts the same way: a model looks
            better than the thing it replaced, and I want to know whether that
            survives a harder test. At the Joint Genome Institute I retrained
            QuickBin&apos;s terminal network for PacBio data and built the
            leakage-safe evaluation around it. Contamination fell on genomes
            the training had never seen; an external benchmark then exposed a
            recovery tradeoff, which became the next round of questions. My
            music-cognition research asks how statistical structure turns into
            expectation. The pattern repeated there — a clean synthetic win,
            then a real corpus that sent me back to the representation
            underneath. I would rather narrow a claim than defend one the data
            has outgrown.
          </p>
        </div>
      </section>
    </main>
  );
}
