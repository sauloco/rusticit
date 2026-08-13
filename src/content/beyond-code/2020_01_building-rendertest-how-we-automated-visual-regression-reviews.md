---
title: 'Building RenderTest: How We Automated Visual Regression Reviews'
description: 'At Synphonyte, I built RenderTest, a visual regression pipeline that turned screenshot comparisons into a collaborative Slack-driven workflow the whole team could act on.'
pubDate: 'Jan 15 2020'
tags: ['career', 'remote', 'healthcare']
heroImage: '../../assets/beyond-code/render-tests.webp'
---

There is a moment in every frontend team's life when someone says:

*"I only changed a button. There's no way this affected anything else."*

And then someone else opens the staging environment and discovers that three unrelated screens are now broken.

That exact problem led me to build **RenderTest** while working at Synphonyte.

The goal wasn't simply to compare screenshots. We wanted a workflow that fit naturally into the development process, minimized manual QA, and helped the entire team decide whether a visual change was expected or a regression.

## The Problem

As our frontend applications grew, every Merge Request introduced a risk of visual side effects.

Even small CSS changes, component updates, or dependency upgrades could unintentionally affect completely unrelated screens. Traditional automated tests were great at verifying behavior, but they couldn't answer one simple question:

**"Does the application still look the way we expect?"**

Reviewing every page manually after every deployment simply didn't scale.

## The Idea

Instead of asking developers or QA engineers to inspect every screen, we decided to automate the entire process.

Every preview deployment triggered a visual regression pipeline that reproduced user interactions, captured screenshots, compared them against a baseline, and generated a report for the team.

The important part wasn't taking screenshots.

It was turning those screenshots into an actionable workflow.

## How RenderTest Worked

The pipeline looked something like this:

1. A Merge Request created a preview deployment.
2. Automated browser scenarios navigated through the application.
3. Screenshots were captured at predefined checkpoints.
4. Every image was compared against an approved baseline.
5. A visual diff report was generated whenever differences were detected.
6. The report was automatically posted to a dedicated Slack channel.

At that point, the review process became collaborative instead of manual.

## Human in the Loop

One design decision I'm still happy with was avoiding automatic assumptions.

Not every visual difference is a bug.

Sometimes the UI is supposed to change.

Instead of forcing developers to inspect folders full of images, the Slack integration allowed reviewers to classify every detected difference with a single action.

If the change was intentional:

- the new screenshots became the baseline for future comparisons.

If the change was unexpected:

- an issue was automatically created in the tracking system so the regression could be investigated before reaching production.

That small decision transformed RenderTest from a screenshot generator into part of our engineering workflow.

## Why It Worked

Looking back, I don't think the biggest achievement was the image comparison algorithm.

The real value came from integrating visual regression testing into the team's daily routine.

Developers didn't need to remember another tool.

Reviewers didn't need to download reports.

QA didn't need to repeat the same visual checks every release.

The pipeline surfaced only the changes that deserved attention and made it easy to decide what should happen next.

## Lessons Learned

Building RenderTest reinforced something I've seen many times since.

Automation is most valuable when it removes decisions, not just work.

Taking screenshots automatically saves a little time.

Automatically routing every visual change toward the correct outcome saves an entire workflow.

That's the difference between building a tool and building a system.

Today, AI is changing how we write software, but I still believe the biggest engineering wins come from designing workflows that help people make better decisions with less effort.

RenderTest was one of the first projects that taught me that lesson, and it still influences how I build developer tooling today.