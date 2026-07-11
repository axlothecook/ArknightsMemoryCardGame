# Arknights Memory Card Game
A memory game themed around **Arknights**, a mobile tower defense cacha game. 'Operators' are characters on the cards that the user needs to discern between, in total of 19.

## How to play
1) Adjust difficulty and press start on the landing page.
2) Depending on the difficulty, different sets of cards are dealt (4, 12, 18 or 19). Click a card each round.The goal is to click a card you haven't picked before.
3) The cards reshuffle each round, so you need to keep track of who you've already clicked.
4) Clicking a repeated operator ends the run and displays your score.
5) Click on every operator in the given set to win.

Four difficulty levels change how many operators are in play (easy, medium, hard or special). Your best score is saved locally between sessions.

## Features
- API fetching all character photos
- Four difficulty tiers
- 3D parallax tilt on every card
- High score persisted in localStorage
- End screen showing high score so far, this run's score and links to retry or return to home

## Tech stack
Framework: [React 19](https://react.dev/)
Building and server: [Vite](https://vite.dev/) 
Styling: [Tailwind CSS 4](https://tailwindcss.com/)
3D parallax tilt: [react-parallax-tilt](https://mkosir.github.io/react-parallax-tilt/?path=/story/react-parallax-tilt--default)

## API fetching and limitation
Operator photos are loaded at runtime (website load) from the community fan-made website [Sanity;Gone](https://sanitygone.help/) through fetch() functionality. A limitation is that how 
this API works - it requires a specific number for each operator. Thus a set roster of unchanging numbers decided during project creation pulls the same operators, despite
new ones being released in the game and on the origin website. 

## Design
The project's concept UI were designed in [Figma](https://www.figma.com/design/kkp3LjdiMIIzMkUrA4d6fN/Arknights-Memory-Card-Game?node-id=0-1&m=dev&t=cXDMJ6i1UfidhShl-1)

## Running locally
To run the project locally:
1) install it via ```git clone``` command in terminal
2) Then in the same terminal open the project's local folder and run:
```bash
npm install
npm run dev
```
3) Open the URL link in the terminal (default `http://localhost:5173`).
