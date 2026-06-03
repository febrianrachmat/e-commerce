# Accessibility checklist

Target: **WCAG 2.1 Level AA** where practical for a portfolio demo.

## Implemented (architecture phase)

- [x] **Semantic landmarks** — `<header>`, `<main id="main-content">`, `<footer>`, `<nav aria-label="Main">`
- [x] **Skip link** — “Skip to main content” in `SiteHeader` (visible on focus)
- [x] **Page headings** — One `<h1>` per route
- [x] **Form labels** — `Label` + `htmlFor` on checkout, login, profile
- [x] **Images** — `alt` from product title / user name
- [x] **Error announcements** — `role="alert"` on query errors and product not found
- [x] **Loading** — `aria-busy` / `aria-live` on `QueryState` skeleton
- [x] **Status** — `role="status"` for empty cart and order success
- [x] **Radix primitives** — shadcn Select, Dialog patterns (keyboard-friendly)
- [x] **Theme** — Light / dark / system via class on `<html>`

## Planned (design / polish phase)

- [ ] Full keyboard path for mobile nav / cart sheet
- [ ] `prefers-reduced-motion` — disable Framer Motion when set
- [ ] Focus trap audit in sheets/modals
- [ ] Color contrast audit on final brand palette
- [ ] Screen reader pass on filter controls (live region for result count)
- [ ] E2E a11y scan (axe) in CI — optional

## Manual test script

1. Tab from page load — skip link should appear first.
2. Tab through header links without mouse.
3. Change locale and theme using keyboard only.
4. Add product to cart, adjust quantity with keyboard.
5. Complete checkout with only keyboard.
6. Enable “Increase contrast” / dark mode OS setting — verify readable text.

## References

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Radix Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
