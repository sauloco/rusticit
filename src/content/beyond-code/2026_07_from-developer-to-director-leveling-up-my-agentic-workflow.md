---
title: "From Developer to Director: Leveling Up My Agentic Workflow in EntrenoLibre"
seoTitle: 'From developer to director with agentic workflows'
description: 'I implemented the agentic coding practices from a video that changed how I work with AI, and now I run a small fleet of agents instead of typing every line myself. Here is what actually changed in EntrenoLibre.'
pubDate: 'Jul 14 2026'
tags: ['ai', 'agentic-workflow', 'engineering', 'entrenolibre', 'claude-code']
heroImage: '../../assets/beyond-code/captain-2026.webp'
---

A few days ago I watched [this video](https://www.youtube.com/watch?v=iQyg-KypKAA) by [Kun Chen](https://www.youtube.com/@kunchenguid) on leveling up agentic coding workflows, and today I sat down and actually implemented most of what it suggested in EntrenoLibre.

That sentence undersells what happened. This wasn't "I tried a new VS Code extension." It was a shift in how I relate to my own codebase. By the end of the day, I wasn't writing code so much as I was directing a small fleet of AI agents: reviewing their plans, setting the guardrails they operate inside, and deciding what they're allowed to do unsupervised versus what needs my eyes first.

I've spent years as an individual contributor who happens to use AI tools. Today I started feeling like something closer to a director with a team that never sleeps, doesn't get bored, and does exactly what the process tells it to — for better and worse.

Here's what I actually built, and why each piece matters.

---

## The problem: skills that don't reliably fire

EntrenoLibre is a monorepo — a Strapi 5 API and an Astro 5 + React 19 frontend — and I'd already invested in [Agent Skills](https://agentskills.io), the open standard for packaging domain-specific instructions an AI agent can load on demand. I had skills for Strapi content-type patterns, Astro/React/Tailwind conventions, TypeScript idioms, and more.

The problem the video named precisely: **AI assistants don't reliably auto-invoke skills, even when the trigger obviously matches the request.** They treat the skill as background noise and barrel ahead with a generic approach instead. I'd seen this myself — write a new Strapi lifecycle hook, and the agent would sometimes just... not read the `entrenolibre-api` skill first, even though it exists specifically for that.

The fix was almost embarrassingly direct: stop hoping the agent notices, and *command* it instead. Every `AGENTS.md` in the repo (root, `api/`, `web/`) now has an explicit **Auto-invoke Skills** table:

| Action | Skill |
|--------|-------|
| Creating/modifying Strapi content types | `entrenolibre-api` |
| Writing React components | `react-19` |
| Verifying E2E flows or driving the app in a browser | `chrome-devtools-axi` |
| An agent is about to run git push for the user | `push` |

Rather than maintain these tables by hand, I built a `skill-sync` meta-skill that reads `metadata.scope` and `metadata.auto_invoke` off each `SKILL.md`'s frontmatter and regenerates the tables automatically. Add a skill, tag it with when it should fire, run the sync script, done. The instruction to invoke is no longer buried in prose the agent might skim past — it's a lookup table sitting at the top of the file it already reads on every task.

---

## One set of skills, four coding agents

The other piece of infrastructure I hadn't taken seriously enough: I don't only use Claude Code. Codex and Gemini CLI both show up in my workflow depending on the task. Previously that meant either duplicating instructions per tool or just... not bothering for the others.

Now `skills/setup.sh` symlinks the same `skills/` directory into whatever location each tool expects:

| Tool | Symlink |
|------|---------|
| Claude Code / OpenCode | `.claude/skills/` |
| Codex (OpenAI) | `.codex/skills/` |
| Gemini CLI | `.gemini/skills/` |
| GitHub Copilot | `.github/skills/` |

One source of truth, four agents reading from it. This is the first concrete sense in which I stopped thinking about "the AI I'm using" and started thinking about "the fleet I'm coordinating" — the skill isn't scoped to a tool, it's scoped to the *codebase*, and whichever agent picks up the task inherits the same domain knowledge and the same guardrails.

---

## A push gate instead of trusting an agent with `git push origin`

This is the change I'm most glad I made.

Letting an agent commit code is one thing. Letting it push straight to `origin` and open a PR is a different risk profile entirely — no human in the loop between "the agent thinks this is done" and "this is now visible to reviewers or, worse, deployed."

So I added a `push` skill with one rule, stated as bluntly as I could write it:

> An agent must never run `git push origin ...` unless the user explicitly asks for an emergency/direct push. Default to the gate: `git push no-mistakes <branch>`

`no-mistakes` is a second git remote wired to a pipeline: review, tests, lint, and docs checks all run in a disposable worktree, and only if everything passes does it forward the branch to `origin` and open the PR. The agent still does the pushing — I didn't take that away — but it's pushing into a gate that can say no, instead of pushing into production trust.

The emergency bypass is deliberately manual: if I want to skip the gate, I do it myself from my own terminal or IDE. The skill explicitly tells the agent not to perform a bypass push on my behalf, and that one emergency doesn't grant standing permission for the next one. That distinction — the agent has autonomy inside the gate, none outside it — is exactly the kind of boundary a director sets for a team, not a line of code a developer writes.

---

## Verification against the real app, not imagined selectors

Before this, "the agent says it works" and "it actually works" were doing a lot of unearned overlap in my head. Agents are very good at writing code that *looks* correct and confidently declaring victory without ever loading the page.

The `chrome-devtools-axi` skill closes that gap by making browser verification mandatory for anything flow-shaped: sign-up, live scoring, match confirmation, admin CRUD. The workflow is concrete — open the page and get a real accessibility snapshot with element refs, interact using those actual refs (never a selector guessed from memory or from reading component source), then check screenshots, console, and network calls to confirm the right requests actually fired.

That last part matters more than it sounds. "The button click worked" is a much weaker claim than "the button click worked *and* the PostHog capture event fired *and* the API returned 200." Now the agent checks the second version before telling me the task is done.

---

## Reviewing plans like a director reviews a proposal, not like a developer reads a diff

The piece that most changed how the day *felt* was `lavish-axi` — a review loop where every plan, including the formal EnterPlanMode flow, gets rendered as an annotatable HTML artifact in the browser before I approve it. I mark up specific elements or lines, queue comments, and the agent polls for that feedback and revises in place before anything is considered final.

This sounds like a small UX nicety. It isn't. Reading a wall of planning text and reading an annotatable, structured artifact are different cognitive tasks. The first asks me to hold the whole plan in my head and reply in prose. The second lets me point at the third bullet point and say "not this one" without re-explaining the other nine. It's the difference between reviewing a PR by re-typing the diff from memory versus commenting directly on the lines.

That's the director posture in one workflow: I'm not writing the plan, and I'm not blindly accepting it either. I'm reviewing it the way you'd review a report from someone on your team — quickly, specifically, and in a format built for feedback rather than authorship.

---

## Multiple tasks, multiple projects, no context whiplash

The part I didn't expect was how much this changes multitasking, not just single-task quality.

Before, switching between EntrenoLibre and another project mid-day meant a real context cost — re-explaining conventions, re-establishing what's safe to touch, re-loading the mental model of "how this codebase does things" every time I came back. Now that convention lives in skills and gates instead of in my head, an agent picks it up cold. I can kick off a Strapi lifecycle fix in EntrenoLibre, switch to this blog to write a post, come back, and the agent hasn't lost the plot — because it was never relying on *me* to hold the plot in the first place.

Running multiple tasks in parallel, across multiple projects, has genuinely become a breeze. That's a very different feeling from "I have an AI autocomplete." It's closer to running several workstreams at once and only stepping in at decision points — which is, again, more director than developer.

## What's next: Firstmate

The natural next step is tightening the loop between me and that fleet even further. I'm planning to implement [Firstmate](https://github.com/kunchenguid/firstmate) soon — also from Kun Chen — which, from what I've seen, is built exactly for this shape of problem: giving a human a proper command deck over multiple agents instead of juggling terminal tabs and hoping nothing collides.

Skills gave the agents shared knowledge. Gates gave them boundaries. Review loops gave me oversight without micromanagement. What I still don't have is a single place to actually *see* the fleet — what every agent is doing right now, across every project, at a glance. That's the piece Firstmate is meant to close. Once that's in place, I think "director" stops being the right metaphor and "captain" starts being closer to it — less reviewing individual reports, more standing on a bridge watching the whole ship move.

---

## What "director of a fleet of agents" actually means, concretely

It's a good pull-quote, but I want to be precise about what changed today instead of leaving it as a vibe:

- **Delegation with domain knowledge, not just task descriptions.** Skills mean I don't re-explain Strapi lifecycle conventions or Tailwind patterns every session — the agent already knows, and now it reliably *remembers* it knows.
- **Guardrails encoded as infrastructure, not as trust.** The push gate doesn't rely on the agent "being careful." It relies on there being no path to `origin` that skips review.
- **Verification as a required step, not an optional nice-to-have.** No flow ships as "done" without being driven in a real browser against real network responses.
- **Review built for oversight, not just approval.** Plans go through an annotation loop because a director's job is to give specific, structured feedback quickly — not to either rubber-stamp or rewrite from scratch.
- **One set of instructions, portable across whichever agent is on the task.** The fleet isn't one tool. It's Claude Code, Codex, and Gemini CLI all reading from the same playbook.

None of this makes the agents smarter. What it does is give me a system where I don't have to *personally* verify every line, because the process verifies it structurally — through gates, through mandatory browser checks, through review loops — before it ever reaches me for final sign-off.

That's the actual shift from developer to director: not writing less code because I got lazy, but building the scaffolding that lets a fleet of agents do trustworthy work without me supervising every keystroke.

The interesting part isn't that AI can write code. It's that with the right skills, gates, and review loops around it, I can stop checking its work line by line and start checking that the *system* is sound. That's a different job. I like it more.
