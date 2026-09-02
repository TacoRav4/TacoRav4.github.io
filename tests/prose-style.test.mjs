import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

/**
 * Mechanical prose audit for the writing rule in COLLABORATION.md.
 *
 * Every reader-facing field is checked on its own. Real lists may contain
 * several items, but each list item must still read as a normal sentence.
 * Proof rows and eyebrow labels are data labels rather than running prose.
 */

const routes = [
  new URL("../dist/index.html", import.meta.url),
  new URL("../dist/work/quickbin/index.html", import.meta.url),
  new URL("../dist/work/tonal-inference/index.html", import.meta.url),
  new URL("../dist/work/connect-four/index.html", import.meta.url),
  new URL("../dist/work/astar/index.html", import.meta.url),
  new URL(
    "../dist/work/harmonic-surprisal/index.html",
    import.meta.url,
  ),
  new URL(
    "../dist/work/structured-review-lab/index.html",
    import.meta.url,
  ),
];

const svgRoutes = [
  new URL("../dist/structured-review/review-flow.svg", import.meta.url),
  new URL("../dist/structured-review/review-flow-mobile.svg", import.meta.url),
];

const SCANNED_TAGS = ["p", "h1", "h2", "h3", "h4", "figcaption", "dd", "li"];
const DATA_LABEL_CLASSES = new Set(["proof", "eyebrow"]);

function decode(text) {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&apos;|&#x27;|&#39;/g, "'")
    .replace(/&middot;|&#183;/g, "·")
    .replace(/\s+/g, " ")
    .trim();
}

function classes(attributes) {
  const match = attributes.match(/\bclass=["']([^"']*)["']/i);
  return new Set(match ? match[1].split(/\s+/).filter(Boolean) : []);
}

export function extractReaderFacingFields(html) {
  const clean = html.replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, " ");
  const fields = [];

  for (const tag of SCANNED_TAGS) {
    const pattern = new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)<\\/${tag}>`, "gi");
    for (const match of clean.matchAll(pattern)) {
      const fieldClasses = classes(match[1]);
      if ([...fieldClasses].some((name) => DATA_LABEL_CLASSES.has(name))) continue;
      const value = decode(match[2]);
      if (value) fields.push({ kind: tag, value });
    }
  }

  for (const match of clean.matchAll(/\balt=["']([^"']*)["']/gi)) {
    if (match[1]) fields.push({ kind: "alt", value: decode(match[1]) });
  }
  for (const match of clean.matchAll(
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/gi,
  )) {
    fields.push({ kind: "metadata", value: decode(match[1]) });
  }
  for (const match of clean.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)) {
    fields.push({ kind: "title", value: decode(match[1]) });
  }
  return fields;
}

export function extractSvgReaderFacingFields(svg) {
  const fields = [];
  for (const tag of ["title", "desc", "text"]) {
    const pattern = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
    for (const match of svg.matchAll(pattern)) {
      const value = decode(match[1]);
      if (value) fields.push({ kind: `svg-${tag}`, value });
    }
  }
  return fields;
}

const patterns = [
  {
    name: "Oxford-comma triad",
    pattern: /,(?!\d)[^,;:.!?]{1,80},(?!\d)[^,;:.!?]{0,80}\b(?:and|or)\b/i,
  },
  {
    name: "bare-comma triad",
    pattern:
      /(?:^|[\s(“"])[\w'’/-]+(?:\s+[\w'’/-]+){0,2},\s+[\w'’/-]+(?:\s+[\w'’/-]+){0,2}\s+(?:and|or)\s+[\w'’/-]+/i,
  },
  {
    name: "semicolon triad",
    pattern: /;[^;.!?]{1,100};[^;.!?]{0,100}\b(?:and|or)\b/i,
  },
  {
    name: "middle-dot triad",
    pattern: /·[^·.!?]{1,100}·/,
  },
];

export function findViolations(fields) {
  const violations = [];
  for (const field of fields) {
    for (const sentence of field.value.split(/(?<=[.!?])\s+/)) {
      for (const { name, pattern } of patterns) {
        if (pattern.test(sentence)) {
          violations.push({ kind: field.kind, name, value: sentence.trim() });
          break;
        }
      }
    }
  }
  return violations;
}

test("triad fixtures catch disguised variants", () => {
  const html = `
    <p>We checked depth, held-out seeds, and machine agreement.</p>
    <figcaption>We checked depth; held-out seeds; and machine agreement.</figcaption>
    <dd>depth · held-out seeds · machine agreement</dd>
    <li>models, datasets and machines</li>
  `;
  const violations = findViolations(extractReaderFacingFields(html));
  assert.deepEqual(
    violations.map(({ name }) => name),
    [
      "Oxford-comma triad",
      "semicolon triad",
      "middle-dot triad",
      "bare-comma triad",
    ],
  );
});

test("triad fixtures allow pairs, decimals, and data labels", () => {
  const html = `
    <p>I compared the original run and its reproduction.</p>
    <p>The estimate was 93.0%, with a 95% interval of [86.3%, 96.6%].</p>
    <p class="proof">93/100 held out · Wilson [86.3%, 96.6%] · 140/140 matched</p>
    <p class="eyebrow">Case study 03 · Connect Four</p>
    <ul><li>One result per seed.</li><li>One machine at a time.</li></ul>
  `;
  assert.deepEqual(findViolations(extractReaderFacingFields(html)), []);
});

test("reader-facing fields contain no coordinated triads", async () => {
  const violations = [];
  for (const route of routes) {
    const html = await readFile(route, "utf8");
    for (const violation of findViolations(extractReaderFacingFields(html))) {
      violations.push(
        `${route.pathname.replace(/^.*dist/, "dist")} [${violation.kind}/${violation.name}]: ${violation.value}`,
      );
    }
  }
  assert.deepEqual(violations, [], `coordinated triads found:\n${violations.join("\n")}`);
});

test("Structured Review SVG text contains no coordinated triads", async () => {
  const violations = [];
  for (const route of svgRoutes) {
    const svg = await readFile(route, "utf8");
    for (const violation of findViolations(extractSvgReaderFacingFields(svg))) {
      violations.push(
        `${route.pathname.replace(/^.*dist/, "dist")} [${violation.kind}/${violation.name}]: ${violation.value}`,
      );
    }
  }
  assert.deepEqual(violations, [], `coordinated triads found:\n${violations.join("\n")}`);
});

test("no heading template repeats across pages", async () => {
  const headings = [];
  for (const route of routes) {
    const html = await readFile(route, "utf8");
    for (const match of html.matchAll(/<h[123][^>]*>([\s\S]*?)<\/h[123]>/g)) {
      headings.push(decode(match[1]));
    }
  }
  const whenCount = headings.filter((heading) => /^When\b/.test(heading)).length;
  assert.ok(whenCount <= 1, `"When ..." heading template used ${whenCount} times`);
});
