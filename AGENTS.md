# AGENTS.md

Behavioral guidelines to reduce common LLM coding mistakes, derived from
[Andrej Karpathy's observations](https://x.com/karpathy/status/2015883857489522876)
on LLM coding pitfalls. Merged with project-specific rules.

**Tradeoff:** these bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Remove orphans that YOUR changes created. Leave pre-existing dead code alone.

The test: every changed line traces directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

## Project-Specific Guidelines

### Architecture constraints

- **No backend.** No API routes, no database, no auth, no server actions that
  write. The site is fully static. Reservation = WhatsApp deep link.
- **Runtime deps stay minimal.** Currently `next`, `react`, `react-dom`. Adding
  a dependency needs a stated reason; "convenience" is not one.
- **TypeScript strict.** `noUncheckedIndexedAccess` is on. No `any`.
- **All routes statically prerendered.** If a change makes a route dynamic,
  say so explicitly.

### Non-negotiable rules

- **Never write `wa.me` outside `lib/whatsapp.ts`.** Verify with
  `grep -r "https://wa.me" app components` — must return nothing.
- **Reservation messages stay Indonesian.** The reader is restaurant staff.
  All other copy is English.
- **NAP in `lib/seo/site.ts` must match Google Business Profile exactly.**
  `phone` is E.164 for JSON-LD; `whatsapp` is digits-only for `wa.me`.
  They are deliberately separate.
- **Menu content lives in `data/menu.ts`.** Never hardcode dish names or prices
  in components. `price` is an integer in IDR; format at render.

### Theme rules (see README for full rationale)

- Saffron is **never** a button background — primary buttons are ink.
- Body copy uses `--color-muted`, not `--color-ink`.
- No shadows, no border-radius.
- Theme tokens live only in `app/globals.css` `@theme`.

### Before claiming work is done

```bash
pnpm test && pnpm type-check && pnpm lint && pnpm build
```

---

**These guidelines are working if:** diffs contain only requested changes, code
is simple the first time, and clarifying questions come before implementation.
