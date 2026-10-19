# Baghcheh

Free, offline-first learning site for Persian-speaking children. Plain static files, no build step
(`README.md` has the structure and how to add lessons and step types).

## Content plan

`CURRICULUM.md` and the subject plans in `curriculum/` are the single source of truth for what Baghcheh teaches. Before any work on lessons, subjects,
step types, games or animations, use the `content-plan` skill (`.claude/skills/content-plan/SKILL.md`): build what
the plan says, change the plan first when the content should change, update it in the same change, and run
`node tools/check-plan.js` before finishing.

## Other rules

- Persian text follows `STYLE.md`; UI strings live in `js/strings.js`.
- Reading lessons: `node tools/check-reading.js` (only letters taught so far).
- New files go in `index.html` (content and step files also in `browse.html`, the content browser) and in `FILES` in `sw.js` (see "Release checklist" in `README.md`).
