---
name: content-plan
description: Keeps Baghcheh's content in line with the central content plan, CURRICULUM.md and the subject plans in curriculum/. Use it before any work on what Baghcheh teaches - adding, writing, editing, reordering, retitling or removing a lesson in js/lessons/, adding a subject or a garden's lessons, adding a step type, game or animation, planning or reviewing the curriculum, or answering "what should we build next?" or "what does Baghcheh cover?". Also use it whenever a change of plan comes up in conversation, so CURRICULUM.md is updated in the same change and never diverges from the lessons.
---

# Building content from the plan

The plan is the single source of truth for what Baghcheh teaches. `CURRICULUM.md` (project root) holds what every
subject shares: depth (Baghcheh is a full curriculum that parents can use at «پایه», «کامل» or «همراه مدرسه»), time
and sizing, the scope-and-sequence format, how lessons are built, content types and step types. Each subject's scope
and sequence is in `curriculum/<subject>.md`: frameworks, strands, and per garden its objectives (what the child can
do, `core` or `full`, the matching Iranian school grade), its lessons (each naming the objectives it teaches) and
the practice generators it needs. The lessons in `js/lessons/` must always match it; `node tools/check-plan.js`
enforces the match.

## Before building

1. Read `CURRICULUM.md` (at least "A full curriculum…", "Scope and sequence", "Changing the plan", "How lessons are
   built", "Content types") and the subject's file in `curriculum/`.
2. Find the rows for the lessons you are about to build. Build what the row says: its id, its garden, its place in
   the order, what it covers, the objectives it teaches (each step should serve one of them), and the content types it lists (e.g. "animation, game (`sort`), home" means a `story`
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
- **Animations must show what they say.** A caption may only describe what is on the stage in that scene: every
  object it names is visible, and every action it names is actually shown moving (not a generic bounce, shake or
  grow standing in for washing, climbing or looking from above). If the `story` step cannot show something, cut
  it from the caption or use a different step; never let the words promise a picture that isn't there.
  "Plays to the end with no console errors" is not a check: open `tools/storyboard.html#<lesson id>` (from the
  site's server), look at every scene's picture next to its caption, and fix any mismatch before you report the
  lesson as done.
- **Use `scene` for anything that moves** (`js/scene.js`, drawings in `js/art/rig.js`): washing, climbing, pouring,
  growing, a change of view. It has moving parts, paths, particles, a camera and the child doing it (`wait`).
  `story` only moves whole pictures from place to place: use it only where that is all the caption says. Add the
  drawings a scene needs to `js/art/rig.js` (one view per drawing: from the side, from above), in the house style.
  For a journey, build the world wider than the stage, pan the camera with the walkers (`cam` + `walk`), and put
  scenery at depths (sky 0, hills 0.3, street 1) so places really pass by. Don't hurry: one idea per scene, and
  let the engine's pace and rests work (don't shorten times to compensate). People are always whole: in a
  scene, person emoji become full-body walkers (set `look`, and `flip` so people talking face each other).
  Never decide yourself whether a woman or girl wears a headscarf: give her `hair: "auto"` and a `kind` (girl,
  woman, grandma) and let `B.headscarf` choose (by chance, more often without; see STYLE.md rule 6). A drawing
  file that builds its own people calls `B.headscarf(key, kind)` for every woman or girl.

## Before finishing (every time content changed)

1. Update the plan in the same change (the subject's `curriculum/<subject>.md`, and `CURRICULUM.md` for shared
   things): status, title, "Covers", "Content types", "Objectives" and "Depth" of every lesson you touched, new rows
   for new lessons, removed rows for dropped plans, objectives that changed, the subjects table for a new subject.
   Every objective must stay taught by at least one lesson.
2. Run `node tools/check-plan.js` and fix every ✗ it prints. For reading lessons also run
   `node tools/check-reading.js`. When you commit, stage the plan files with the lessons, set their rows to ✅,
   and run the check again on the staged files before committing.
3. In your summary to the user, say which plan rows changed.

## Changing only the plan

When the user changes the plan itself (new topics, a different order, a subject's scope), edit `CURRICULUM.md` or
the subject's file in `curriculum/` and run `node tools/check-plan.js`; it must still pass, since a planned row can never point at a lesson that
already exists. If the change affects lessons that are already built, list them for the user: they need a
follow-up change (built lessons are never deleted, only kept or revised).
