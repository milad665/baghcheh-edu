---
name: content-plan
description: Keeps Baghcheh's content in line with the central content plan, CURRICULUM.md. Use it before any work on what Baghcheh teaches - adding, writing, editing, reordering, retitling or removing a lesson in js/lessons/, adding a subject or a garden's lessons, adding a step type, game or animation, planning or reviewing the curriculum, or answering "what should we build next?" or "what does Baghcheh cover?". Also use it whenever a change of plan comes up in conversation, so CURRICULUM.md is updated in the same change and never diverges from the lessons.
---

# Building content from the plan

`CURRICULUM.md` (project root) is the single source of truth for what Baghcheh teaches: every subject, garden
and lesson, what each covers, and which content types it uses (lesson, game, animation, story, inquiry, coding,
calm, home, parent tip). The lessons in `js/lessons/` must always match it. `node tools/check-plan.js` enforces
the match.

## Before building

1. Read `CURRICULUM.md`: at least "Changing the plan", "How lessons are built", "Content types", and the section
   of the subject you are working on.
2. Find the rows for the lessons you are about to build. Build what the row says: its id, its garden, its place in
   the order, what it covers, and the content types it lists (e.g. "animation, game (`sort`), home" means a `story`
   step, a `sort` step and a `home` step). If a row lists a 🆕 step type that does not exist yet, build that
   step type first (see "New step types" in the plan) or ask the user.
3. If the user asks for something the plan does not have, or wants it differently (another topic, order, garden,
   content type), **change the plan first**: edit or add the rows, then build. If the request conflicts with the
   plan in a way that looks unintended (it duplicates a lesson in another subject, breaks the unit shape, skips
   prerequisites), say so briefly and ask before changing either.
4. Also follow the project's other rules: `README.md` (step fields, adding files to `index.html` and `sw.js`),
   `STYLE.md` (Persian text), `method.html` (the method), `policies.html` (neutral, safe content).

## While building

- Lesson ids are permanent (progress is stored by id). Use the id from the plan; never rename or renumber a
  built lesson. A new lesson gets the next free number in its subject and garden.
- Push lessons into `B.LESSONS` in the same order as the rows in the plan: that order is what children see.
- Set a row to 🔨 when its lesson first exists in `js/lessons/`, and to ✅ in the same commit that adds the lesson
  (✅ means committed: `tools/check-plan.js` reads git and fails if a committed lesson is still 🔨, or an uncommitted
  one is ✅). Keep each row's title and "Content types" true to the lesson: the check compares both.
- A new step type gets a line in the plan's "Content types" table (and in `README.md`); remove the 🆕 from the
  rows it unlocks.

## Before finishing (every time content changed)

1. Update `CURRICULUM.md` in the same change: status, title, "Covers" and "Content types" of every lesson you
   touched, new rows for new lessons, removed rows for dropped plans, the subjects table for a new subject.
2. Run `node tools/check-plan.js` and fix every ✗ it prints. For reading lessons also run
   `node tools/check-reading.js`. When you commit, stage CURRICULUM.md with the lessons, set their rows to ✅,
   and run the check again on the staged files before committing.
3. In your summary to the user, say which plan rows changed.

## Changing only the plan

When the user changes the plan itself (new topics, a different order, a subject's scope), edit `CURRICULUM.md`
and run `node tools/check-plan.js`; it must still pass, since a planned row can never point at a lesson that
already exists. If the change affects lessons that are already built, list them for the user: they need a
follow-up change (built lessons are never deleted, only kept or revised).
