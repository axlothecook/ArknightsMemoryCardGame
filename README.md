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

## 4th Difficulty
Last 'Special' difficulty is basically a 'Hard' difficulty, but with a twist, a secret operator, an easter egg with no clues hinting at it.

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


## Demo photos
### Landing page:
[!image](https://github.com/user-attachments/assets/ef654566-bc28-4331-9c9e-3c7d77127565)

### Gameplay example:
[!image](https://github.com/user-attachments/assets/576cc870-e3e8-4c81-9d8e-9b86b1e7a329)

### Settings:
[!image](https://github.com/user-attachments/assets/d1094ddf-2f09-4ee6-9b59-a5c26670d1c5)

### End screen 
Failure example:
[!image](https://github.com/user-attachments/assets/857a6488-53ab-4f2a-8417-bc824dac6ace)

Success example:
[!image](https://github.com/user-attachments/assets/5265eb7c-5a07-4309-84d2-ce8bc3b75238)
