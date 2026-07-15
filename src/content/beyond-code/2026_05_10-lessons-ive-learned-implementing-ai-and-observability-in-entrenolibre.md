---
title: "10 Lessons I've Learned by Implementing AI and Observability in EntrenoLibre"
seoTitle: '10 lessons from AI and observability in EntrenoLibre'
description: 'Shipping AI features in a real product with real users, forms, analytics, failures, and monitoring is a different story. Here are 10 lessons from implementing AI coaching, observability, and security in EntrenoLibre.'
pubDate: 'May 21 2026'
tags: ['ai', 'observability', 'product', 'engineering', 'entrenolibre']
heroImage: '../../assets/beyond-code/coco-2026.webp'
---

Shipping AI features is exciting.

Shipping them in a real product, with real users, forms, analytics, failures, abuse prevention, and monitoring, is a different story.

Over the last few days, while working on EntrenoLibre, I touched several areas that tend to look independent on paper but are deeply connected in practice: AI coaching, analytics, error tracking, public form security, URL state, and product instrumentation.

The commit log looks technical. But underneath it, there's a much more interesting lesson: once you start adding AI and observability to a product, you're no longer just building features. You're designing trust.

Here are 10 things I've learned from implementing AI and observability in EntrenoLibre.

---

## Lesson 1: AI features are only useful if they fit naturally into the product flow

One of the biggest mistakes teams make with AI is treating it like a separate layer.

A chatbot here. A prompt box there. Maybe a floating assistant added late in the process.

That usually creates novelty, not product value.

In EntrenoLibre, the AI coach became much more interesting once it was tied to actual match context. Instead of asking users to "chat with AI" in the abstract, the product can now support coaching based on the live match session or structured match state. That changes everything.

AI becomes more valuable when it is:

- triggered at the right moment
- grounded in product context
- constrained to the user's actual task
- designed as a workflow, not a demo

The lesson is simple: **AI should feel embedded, not bolted on**.

---

## Lesson 2: Good AI product design starts with data shape, not prompt creativity

People love talking about prompts.

But in product work, the bigger challenge is usually not "how do I ask the model nicely?"

It's "what data am I giving it, in what structure, with what guarantees?"

When you build an AI coaching feature around a live match, the model becomes only one piece of the system. Before the prompt even matters, you need to decide:

- what parts of the match state are relevant
- what can be trusted
- what must be serialized
- what should be persisted
- what should remain stateless
- how much ambiguity the system can tolerate

That is why I increasingly think AI implementation is less about prompting and more about **information architecture for machine reasoning**.

The better the structure, the better the output.

---

## Lesson 3: Constraints make AI features better

A lot of weak AI products fail because they allow too much.

Too much freedom. Too much improvisation. Too much room for the model to sound confident without being grounded.

In EntrenoLibre, one of the most important design choices was using evidence-based constraints for the coaching personas. That matters because in sports coaching, vague motivation is cheap, but context-aware guidance is useful.

I was also able to implement prompt injection prevention features to reduce the risk of users steering the coach outside its intended purpose. That work reinforced something important: if guards are too weak, the system becomes easy to manipulate; if they are too strict, legitimate questions get blocked and the experience suffers.

That balance is hard.

But the broader lesson is this:

**AI becomes more trustworthy when you reduce its surface for nonsense.**

More freedom is not always a better UX.

---

## Lesson 4: Observability should start before scale, not after problems appear

A lot of teams postpone analytics and error monitoring because they think they're "not there yet."

I think that's backwards.

By the time a product starts growing, bad observability decisions are already expensive.

Adding PostHog and Sentry to EntrenoLibre reinforced something I've seen many times: instrumentation is not just for debugging. It's part of product thinking.

When you track meaningful events, you start seeing:

- where users engage
- where flows break
- where interest exists but conversion doesn't
- where assumptions about behavior were wrong

And when error tracking is set up properly, you stop guessing whether a problem is isolated, systemic, or self-inflicted.

Observability is not overhead.

It is one of the fastest ways to make a product less blind.

---

## Lesson 5: Not all errors deserve the same attention

This one sounds obvious, but many teams still get it wrong.

If you send every 4xx and every expected failure to Sentry, you are not improving visibility. You are polluting it.

One of the changes I made was filtering noisy 4xx errors in both `beforeSend` and middleware context. That kind of cleanup may sound minor, but it has a huge effect on signal quality.

Monitoring only helps when the signal is readable.

Otherwise, what happens?

- real issues get buried
- alert fatigue appears
- people stop trusting dashboards
- "we have observability" becomes technically true but operationally useless

The takeaway: **instrumentation without curation creates noise, not clarity**.

---

## Lesson 6: Abuse appears faster than most teams expect

One thing this sprint reinforced is how quickly a public product starts attracting unwanted behavior.

On the AI side, implementing prompt injection prevention made it clear that LLM safety is not just about blocking extreme abuse. It is also about keeping the feature aligned with its real purpose without breaking legitimate use cases.

On the platform side, the impact was even more immediate. After adding Sentry and protections around the public forms, I was able to detect bot spam attempts against those forms within a day. I also caught automated requests trying to execute `.php` scripts on the server, which is the kind of internet background noise many teams assume only happens to larger products.

That changed the feel of the work. These were no longer abstract concerns or "future" security tasks. They were already happening.

The lesson is simple: **the moment your product is public, abuse prevention and observability become part of the core product experience.**

---

## Lesson 7: Public forms are attack surfaces, even in small products

It's easy to think spam protection can wait.

Until it can't.

Adding Turnstile verification, honeypot fields, and rate-limiting to public forms was a good reminder that any public input becomes part of your security model. Even if your product is small. Even if your traffic is modest. Even if your forms seem boring.

Attackers do not care whether your product is famous.

They care whether it is available.

What I like about this kind of layered protection is that it reflects a healthier engineering mindset:

- don't rely on one gate
- validate at multiple levels
- let each mechanism do one job well
- strip unsafe or irrelevant data before handing control to core logic

Security in product engineering is often about boring discipline.

And boring discipline is underrated.

---

## Lesson 8: Framework conventions are helpful until product reality pushes back

One subtle but important detail in the form work was this: Strapi's core controller validates request bodies against the schema and rejects unknown keys.

That is reasonable. It protects the model.

But product reality introduced fields like honeypot inputs and Turnstile tokens that were useful for security policies, yet not part of the content schema itself. That meant they had to be consumed by security logic and then stripped before delegating to the core create flow.

I like examples like this because they show a deeper truth of software work:

**Framework defaults are not the product.**

Good engineering often means respecting the framework while adapting it carefully to the actual workflow you need.

That's where judgment matters more than dogma.

---

## Lesson 9: Product analytics are only valuable when events map to real intent

I'm not a fan of analytics for analytics' sake.

Tracking page views and random clicks is easy. Learning something useful from product behavior is harder.

The events added in EntrenoLibre were intentionally closer to product intent:

- auth outcomes
- edition signup attempts
- payment info reveal
- tournament creation
- format selection
- live score session start
- point recording
- match confirmation

These are not just "things users did."

They are clues about what they were trying to achieve.

That distinction matters.

A good analytics plan is not a list of technical events. It is a model of user intention across the product.

When teams get that right, analytics becomes a decision tool instead of a reporting habit.

---

## Lesson 10: Backward compatibility is part of shipping discipline

One of the quieter lessons in product work is that users don't care which version of your assumptions they are carrying.

Your system has to care for them anyway.

When serializing `sport` into the URL state and showing it in match history, it was necessary to default older links to tennis if they predated that field. That is not flashy work, but it is exactly the kind of detail that keeps products feeling stable instead of fragile.

Backward compatibility often lives in small decisions:

- default values
- migration logic
- serialization format
- resilient deserialization
- graceful handling of old state

It's not glamorous.

But it's one of the clearest signs that a product is being built with maturity.

---

## Final thought

Implementing AI in a product is not mainly about plugging into a model.

Implementing observability is not mainly about adding tools.

And improving security is not mainly about blocking abuse.

All three are really part of the same question:

**Can this product be trusted under real conditions?**

That's the standard I'm trying to build toward with EntrenoLibre.

Not just more features.  
Not just smarter outputs.  
A product that behaves well when real users, real failures, and real complexity show up.

That's where the interesting work begins.
