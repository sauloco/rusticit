---
title: 'Building advanced dental imaging software on the web'
description: 'At Synphonyte, I helped design and lead the development of Canaray Voxel, a Three.js and Vue-based web application for high-resolution dental and craniofacial scan analysis, collaborative workflows, and clinical reporting.'
pubDate: 'Aug 15 2019'
tags: ['career', 'remote', 'healthcare']
heroImage: 'https://images.pexels.com/photos/4834142/pexels-photo-4834142.jpeg'
---

When people think about browser-based software, they often imagine dashboards, forms, and standard CRUD applications.

Canaray Voxel was not that kind of product.

It was a web application built to handle everything from small-field, high-resolution endodontic scans to full-skull scans used in orthognathic surgery, giving dental professionals advanced tools for visualization, collaboration, and clinical incident reporting.

I joined Synphonyte as its fourth employee while the product was still being shaped, and I helped design the architecture from scratch and lead the development of the web application.

From the beginning, this was not just about rendering images in a browser.

It was about making highly specialized medical imaging workflows usable, performant, and reliable inside a modern web stack.

## The stack

The application was primarily built with **Vue.js** and **Three.js**, with more and more logic later moving into **Rust compiled to WebAssembly**.

That combination mattered.

It allowed us to push the browser much further than typical line-of-business applications, especially in areas like:

- real-time volume rendering
- advanced 2D and 3D visualization
- interactive analysis workflows
- responsive user interaction on complex medical data
- tooling for debugging rendering-heavy behavior

This was the kind of software where frontend work was deeply technical. Not only in the interface layer, but also in how rendering, performance, data flow, and user workflows interacted.

## What I worked on

My contribution covered both product-facing features and engineering infrastructure.

On the product side, I implemented many of the features visible in the interface, including parts of the tree view, drag-and-drop interactions, and several user interface capabilities built to streamline how professionals navigated and analyzed scans.

On the engineering side, I also built internal tools and workflows to support the complexity of the product itself.

One of the most important examples was a fully custom visual regression workflow designed around the rendering engine and UI behavior.

The process worked end to end like this:

1. Run the application or rendering scenario
2. Capture screenshots automatically
3. Run a diff algorithm against expected results
4. If a difference was detected, notify a Slack channel
5. Let a user decide whether the difference was expected or an actual bug
6. If it was a bug, create the corresponding item in the bug board for follow-up

That workflow connected multiple platforms and services, including secure AWS buckets, S3, Slack, and Trello, and helped the team manage the reality of a product where even small visual changes could matter.

I also worked on developer tools to debug parts of the rendering pipeline and other difficult behaviors inside the application, which was essential in a product where visual correctness and interaction fidelity were part of the core value.

## My first international contractor experience

This project was also a major milestone in my career for a different reason: it was my **first experience working as a contractor for a German company**.

That mattered a lot.

It was the first time I was operating in a fully international environment with the expectations, communication standards, and autonomy that come with that kind of work.

The team was fully distributed. Communication happened in **spoken English**, day to day, and I also had direct contact with the client as part of the job.

That changed the experience significantly.

It was not only about shipping features. It was also about discussing requirements clearly, aligning expectations across people in different locations, and representing the company professionally in front of the client when needed.

At times, when the company founders or team leads were on vacation, I had to step into that responsibility myself and act as a direct representative of the company in those conversations.

That experience helped me grow in a different dimension.

It pushed me to become more comfortable in international communication, more precise in how I explained technical work, and more reliable in situations where trust and autonomy mattered as much as implementation.

## Why this project mattered

Canaray Voxel was one of the clearest examples in my career of what it means to build software at the edge of what the browser can do.

It combined several things at once:

- highly specialized domain requirements
- advanced rendering and visualization
- performance-sensitive frontend architecture
- medical-professional workflows
- collaborative analysis and reporting
- custom QA and debugging infrastructure

That mix forced a higher standard.

It was not enough for the app to look modern or feel smooth. It had to help professionals interact with complex scan data in a way that felt precise, efficient, and trustworthy.

It also became a milestone in my career beyond the technical side: it was the first time I combined deep frontend engineering, distributed teamwork, English-first communication, direct client exposure, and contractor responsibility for a German company all in the same role.

## What I learned from it

This project pushed me to think of frontend engineering in a broader way.

Not as “UI implementation,” but as a combination of:

- systems thinking
- rendering performance
- user workflow design
- developer experience
- reliability under complexity

It also reinforced something I still believe strongly:

some of the best frontend work happens in products where the browser is being asked to do something genuinely hard.

And when that happens, architecture, tooling, communication, and product thinking matter just as much as code.