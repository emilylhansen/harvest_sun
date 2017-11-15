const Player = require('./player.js');
const Game = require('./game.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new Game(canvas,ctx);
  game.update();

});
