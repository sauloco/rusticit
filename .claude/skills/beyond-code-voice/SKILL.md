---
name: beyond-code-voice
description: Write or edit a "Beyond Code" blog post (src/content/beyond-code/) in Saulo's voice. Use when the user asks to draft a new blog post, write a new article, turn an experience/project/lesson into a post, or edit an existing beyond-code entry for tone consistency.
---

# Beyond Code voice

Distilled from the 17 posts in `src/content/beyond-code/`. This is a personal-brand blog: first-person reflections on a career spanning accessibility work, public-health software, medical imaging, streaming, Rust, and founding RusticIT/EntrenoLibre. Every post turns one real experience into a transferable lesson.

## Voice in one line

Reflective, confident, plainspoken. Short declarative sentences carry the argument; longer sentences unpack it. No hype, no jargon-for-its-own-sake, no forced enthusiasm. The author trusts the story to be interesting without overselling it.

## Structural DNA

Almost every post follows this shape:

1. **Cold open, no preamble.** First line drops straight into the scene or claim — never "In this post I will discuss." Often a short aphoristic line standing alone:
   - "Sometimes, a small post tells you more than a polished announcement ever could."
   - "There is a moment in every frontend team's life when someone says: ..."
   - "RusticIT was never just a freelance label."
2. **Context paragraph.** Where/when/what — grounds the reader in the real project, company, or moment (Synphonyte, EntrenoLibre, municipal health system, etc.) within 1-3 short paragraphs.
3. **The turn.** A pivot from "what happened" to "what it revealed" — usually signaled by a standalone one-line paragraph like "That experience stayed with me." or "That changed the feel of the work."
4. **Body, often numbered "Lessons" or `##` sections.** Longer/technical posts (2024+) use `## Lesson N: <insight framed as a claim>` headers. Earlier/shorter posts stay unsectioned and flow as continuous narrative.
5. **Bolded distilled takeaway.** Nearly every section and every post ends with one sentence in **bold** that compresses the point into a quotable line:
   - "**AI should feel embedded, not bolted on**."
   - "**instrumentation without curation creates noise, not clarity**"
   - "Does this help real people understand, act, and move forward more clearly?"
6. **Closing that widens the lens.** Final section (sometimes "Final thought" or "What this means if you're...") zooms out from the specific project to a general principle applicable to any reader/team, then lands on one more short standalone line.
7. **Optional CTA (recent posts only).** Newer, more commercial posts end with an italic paragraph pitching RusticIT work, e.g. `*If you're trying to get an AI feature out of demo mode... [Book a 20-min intro](https://cal.com/rusticit/20min) or [email me](mailto:info@rusticit.com).*` Only use this on posts framed as consulting-relevant technical lessons — never on personal/origin-story posts.

## Sentence-level patterns

- **Fragment-as-punctuation.** One- or two-word/short sentence paragraphs used constantly for rhythm and emphasis:
  - "That experience stayed with me."
  - "Not because I claimed to be an expert."
  - "That idea never left."
- **Triadic escalation / anaphora.** Repeats a sentence stem 2-4 times with variation, often as separate lines:
  - "It was not a launch. / It was not a product release. / It was not even a particularly elaborate piece of content."
  - "It shaped the way I think about users. / It shaped the way I value clarity. / It shaped the way I understand accessibility."
- **Rhetorical question as pivot**, frequently bolded, often mid- or end-of-post:
  - "**Does this help real people understand, act, and move forward more clearly?**"
- **Short contrast pairs** ("X. Not Y.", "Not X. Y."):
  - "It was closer to: I am taking this seriously, and this is becoming part of where I'm headed."
  - "Automation is most valuable when it removes decisions, not just work."
- **Bulleted micro-lists** (3-6 short fragments, no punctuation at line end) used to enumerate qualities or conditions rather than steps:
  ```
  AI becomes more valuable when it is:
  - triggered at the right moment
  - grounded in product context
  - constrained to the user's actual task
  - designed as a workflow, not a demo
  ```
- **Numbered lists** reserved for actual sequences (a pipeline, a process), not general enumeration.
- **Em dashes** used for parenthetical asides mid-sentence, sparingly.
- **Minimal metaphor/simile.** Almost none. Concrete specifics (real numbers, real company names, real tools) do the persuasive work instead.

## Diction and tone rules

- First person throughout ("I built," "I learned," "I think"), never royal-we except when describing a team's shared decision ("we decided," "our team").
- Confident but not boastful — achievements are stated plainly, then immediately reframed around the lesson rather than the accomplishment itself.
- No exclamation points. No emoji. No "game-changer," "revolutionize," "unlock," "supercharge," or other marketing filler.
- Technical precision without over-explaining: names real tools, models, numbers (`max_tokens: 150`, `20 requests per IP per hour`, `170,000 patient records`) rather than vague claims.
- Self-aware humility: "I don't think the biggest achievement was...", "That may not be 'internet viral,' but...", "I'm not a fan of analytics for analytics' sake."
- Avoids hedge-stacking — states a view directly ("I think that's backwards") rather than "it could perhaps be argued that."

## Frontmatter conventions

Match `src/content.config.ts` schema exactly:

```yaml
---
title: 'Full descriptive title — often a colon-split "topic: what it explores" structure'
seoTitle: 'Shorter version of title, only when title is long' # optional
description: 'One sentence, third-person-ish summary that states the concrete project/context and the abstract lesson it produced. Always one sentence.'
pubDate: 'Mon DD YYYY' # e.g. 'Jun 11 2026'
tags: ['lowercase-or-kebab', 'topic-tags'] # 1-5 tags: role/domain (career, founder, healthcare), tech (ai, llm, Rust), company (entrenolibre)
heroImage: '../../assets/beyond-code/xxx.webp' # local asset preferred for recent posts; Pexels/Unsplash URL acceptable for older/personal ones
keyInsights: # optional, only on data-rich technical posts
  - number: '150'
    description: 'Short phrase explaining what the number means, may include **bold** for emphasis'
relatedPosts: ['other-post-filename-without-extension'] # optional
---
```

- `description` always does double duty: names the real thing (product, company, event) AND the takeaway, in one sentence.
- `keyInsights` (exactly 3 when present, per schema `.length(3)`) is used only on newer technical/lesson posts with genuinely quantifiable specifics — never invent numbers to fill this field.
- Titles for career/origin posts often use "Before X, there was Y" or "What Z taught me about W" framings. Titles for technical posts state the concrete thing built/shipped, sometimes with a colon-separated subtitle listing the real sub-themes ("speed, guardrails, and knowing when to stop talking").

## What to avoid

- Don't open with throat-clearing ("In today's post, I want to talk about...").
- Don't stack adjectives or reach for grandiose language ("game-changing," "revolutionary," "cutting-edge").
- Don't end a section without a compressed takeaway line — sections that just stop without a landing sentence break the pattern.
- Don't add a CTA to reflective/origin-story posts — reserve it for posts framed as consulting-relevant technical lessons.
- Don't invent specific numbers, tools, or outcomes not grounded in what actually happened — the credibility of this voice depends on concrete, verifiable specifics.

## Using this skill

When drafting a new post:
1. Ask (or infer from context) what real project/moment/lesson this post is about — this voice never works from a generic topic, only a specific lived experience.
2. Pick the register: origin/personal-narrative (unsectioned, reflective, no CTA) vs. technical-lesson (numbered `## Lesson N` sections, concrete specifics, optional CTA).
3. Draft using the structural shape above: cold open → context → turn → body → bolded takeaways per section → widen-the-lens closing → optional CTA.
4. Write frontmatter matching the schema, including a one-sentence description that names both the real thing and the lesson.
5. Read it back for the sentence-level patterns (fragments, triads, rhetorical questions) — if every paragraph is uniform in length and there's no bolded landing line anywhere, it doesn't match the voice yet.