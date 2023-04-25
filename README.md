# Frontend Mentor - Tic Tac Toe solution

This is a solution to the [Tic Tac Toe challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Short description:
- View the optimal layout for the game depending on their device's screen size
- Play the game either solo vs the computer or multiplayer against another person
- Game results are saved in sessionStorage so that it’s preserved if the player refreshes their browser
- In solo version when playing against computer, computer runs in three different modes:
  - first it tracks proactively scenarios to win the game;
  - if no winning scenarios, then CPU detects prevention scenarios to block users win;
  - if no winning scenarios and no prevention scenarios, then CPU randomly chooses cells.
- In solo version player can choose difficulty levels that corresponds to above mentioned modes:
  - Beginner level - CPU runs only random moves.
  - Intermediate level - CPU defends against player's attacks.
  - Advanced level - CPU not only defends but also proactively attacks player.
- In order to scratch the surface of API world, I included API that fetches random quote of the day before every new game session.

### Links

- Live Site URL: [Tic Tac Toe React](https://tic-tac-toe-react.herokuapp.com/)

## My process

### Built with

- React.js
- CSS custom properties
- Flexbox
- CSS Grid
- Express.js

### What I learned

This version of the game is entirely refactored using React.js which was new experience. 
Moreover since I decided to add API call, I needed to include node server, so needed to learn how to fetch API in node and get the result on the client side. 
Last but not least deploying to Heroku was bit of a challenge


### Continued development

Need to work on error handling. 
Also will work on projects that include JSON files, APIs, DBs.

## Author

- Website - [Tomas Vask](https://github.com/TomasVask)
- Frontend Mentor - [@TomasVask](https://www.frontendmentor.io/profile/TomasVask)
