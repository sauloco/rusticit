---
title: 'Designing a safe merge workflow for patient records in a live public health system'
description: 'One of the hardest challenges I worked on in municipal health software was designing and implementing a safe workflow to detect, review, and merge duplicated patient records without downtime or data loss.'
pubDate: 'Dec 18 2017'
tags: ['career', 'healthcare']
heroImage: 'https://images.pexels.com/photos/19223147/pexels-photo-19223147.jpeg'
---

One of the most complex challenges I worked on during my years at the Municipality of Olavarría was helping design and implement a safe workflow for detecting and merging duplicated patient records inside a live public health system.

This was not just a database cleanup.

It was a real operational problem inside a hospital environment, where duplicated identities could affect admission, continuity of care, statistics, and trust in the clinical record itself.

The municipal health system had grown across multiple databases and processes over time. As a result, the same patient could appear more than once under slightly different identities: names written differently, missing or inconsistent ID numbers, typing errors, married and maiden surnames mixed together, or cases where a maternal surname had been used instead of the paternal one.

In that context, duplication was not a minor inconvenience.

If handled incorrectly, it could mean losing information or, even worse, associating clinical results with the wrong person — a type of error the patient could not easily detect and the operator could not safely correct without proper system support.

That is why the merge process became such a critical part of the project.

## The challenge

The goal was not to automatically merge records in bulk.

The goal was to create a safe, controlled, auditable workflow that could:

- detect possible duplicate patients
- assist operators in reviewing them
- preserve all associated information
- unify records across digital and physical supports
- avoid downtime during daily hospital activity

This had to happen while the hospital kept running normally.

Admissions could not stop. Clinical workflows could not pause. Staff needed a process that was reliable enough to support real decisions in real time.

## Detecting possible duplicates

A key part of my contribution was the design and implementation of the duplicate-detection logic.

The system evaluated multiple fields to identify possible repetitions, including:

- first name
- last name
- second name
- maternal surname
- ID number
- age
- birth date
- phone number
- address

Each field was treated differently depending on its nature.

For names and surnames, I implemented a custom **phonetic algorithm in Visual FoxPro** to detect values that sounded similar even when written differently. For numeric fields such as ID numbers, the logic considered the number of differing digits. Other fields used their own comparison rules, including fuzzy matching approaches for likely typing mistakes or incomplete data.

The result was a list of **possible duplicates**, each one ordered by a confidence percentage calculated by the system.

This made the process faster and more focused, but never fully automatic.

## Human validation was required

The system did not merge records on its own.

Instead, it presented possible duplicate cases to the operator, together with all relevant fields, suggested matches, and coincident values. If multiple records appeared to refer to the same person, the operator reviewed the information directly with the patient present and decided which values were correct.

The system could automatically suggest keeping coincident fields such as name, surname, ID number, address, or phone number when they matched, but the final authority always belonged to the user.

Once validated, a new unified record was confirmed, the previous duplicated records were marked as obsolete, and all associated information was redirected to the validated identity.

That was essential.

The system had to support the operator, not replace judgment in a context where a mistake could have serious consequences.

## Beyond the database

The merge process was not limited to patient data stored digitally.

It also included **PDF documents** and generated a workflow for the **Statistics office** to unify physical records as well. The process preserved the history of which clinical record IDs had been unified, leaving traceability across both digital and physical supports.

This mattered because the patient record was not just one row in one table.

It was a broader institutional reality made up of administrative data, medical history, related documentation, and historical records that still existed outside the database.

## How the workflow operated

The process was designed to work without interrupting care.

A simplified version of the workflow looked like this:

1. A patient arrived for medical attention.
2. The operator entered or reviewed the patient data.
3. The system validated that information against the full database asynchronously, without blocking the admission process.
4. If possible duplicates were detected, the operator was notified that the patient had records requiring review.
5. While waiting, the patient was asked to go to the admissions office.
6. An admissions operator validated the data directly with the patient present.
7. The Statistics office received a notification to unify the corresponding digital PDF records and physical supports.
8. Once completed, the record was marked as unified, and all related information from obsolete identities remained associated with the new validated record.

The same validation logic was also used during new patient registration to reduce the creation of future duplicates.

## Audit and control

Every operator decision was audited by the system and later reviewed by the Audit office.

This was a necessary part of the process.

In a hospital environment, the problem is not only whether a workflow works technically. It is whether decisions can be traced, reviewed, and trusted over time.

That auditability made the merge workflow safer and helped support a broader culture of quality around patient admission and record management.

## Why this mattered

The official project documentation describes the larger context behind this work: fragmented systems, repeated records, the need for a single patient identity, redesigned processes, admission improvements, audits, and the broader quality effort that led to ISO 9001 certification for the patient admission-related system at Hospital Municipal “Dr. Héctor M. Cura”. For reference, the official document is available here: [Senado de la Nación Argentina — Premio Nacional a la Calidad](https://www.senado.gob.ar/upload/archivo/45449).

Looking back, this was one of the clearest examples in my career of how difficult real-world software can be when the system cannot stop, the data is imperfect, and the cost of being wrong is too high.

It was not only about code.

It was about designing a process that people could use safely, that different hospital areas could collaborate around, and that could improve the reliability of the whole system without ever asking reality to pause.