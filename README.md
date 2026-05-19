# Arknights Memory Card Game

A memory game themed around **Arknights**. Operator portraits are dealt as
cards — each round, pick an operator you haven't chosen yet. Pick one you've
already clicked and the run ends. Remember who you've seen to clear the board.

## How to play

1. Press start on the landing page.
2. Four operator cards are dealt. Click any operator you **haven't** picked before.
3. The cards reshuffle each round — keep track of who you've already chosen.
4. Clicking a repeated operator ends the run and shows your score.
5. Clear every operator in the set to win.

Three difficulty levels change how many operators are in play (easy / medium /
hard). Your best score is saved locally between sessions.

## Features

- 3D parallax tilt on every card
- Three difficulty tiers
- High score persisted in `localStorage`
- Graceful fallback screen if operator artwork fails to load

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) — build tooling and dev server
- [Tailwind CSS 4](https://tailwindcss.com/) — styling
- [react-parallax-tilt](https://mkosir.github.io/react-parallax-tilt/?path=/story/react-parallax-tilt--default)
  — powers the 3D tilt effect on the cards

## Operator artwork

Operator portraits are loaded at runtime from the community fan-site
**[Sanity;Gone](https://sanitygone.help/)**'s image CDN. This keeps the roster
current as new operators are added to the game, rather than bundling a static
set that would go stale. Note that this is an unofficial fan-site, not an
official API — the image source may change over time.

## Design

The game's concept sketch and UI were designed in Figma:

**[→ Arknights Memory Card Game — Figma board](https://www.figma.com/design/kkp3LjdiMIIzMkUrA4d6fN/Arknights-Memory-Card-Game?node-id=0-1&m=dev&t=cXDMJ6i1UfidhShl-1)**

## Running locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:5173`).
