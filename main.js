
// main.js — головний модуль гри
import { Pokemon } from './pokemon.js';
import { logMessage } from './utils.js';

const logEl = document.getElementById('log');
const attackBtn = document.getElementById('attack');
const strongBtn = document.getElementById('strong');
const healBtn = document.getElementById('heal');

const player1 = new Pokemon({
  name: 'Аш',
  maxHP: 120,
  attackMin: 8,
  attackMax: 20,
  img: 'https://raw.githubusercontent.com/aaron-barker/pokemon-assets/main/pikachu.png'
});

const player2 = new Pokemon({
  name: 'Диктор',
  maxHP: 100,
  attackMin: 6,
  attackMax: 16,
  img: 'https://raw.githubusercontent.com/aaron-barker/pokemon-assets/main/eevee.png'
});

// bind DOM
player1.bindDom({
  hpFill: document.getElementById('p1-hp'),
  hpText: document.getElementById('p1-hp-text'),
  nameEl: document.getElementById('p1-name'),
  imgEl: document.getElementById('p1-img')
});

player2.bindDom({
  hpFill: document.getElementById('p2-hp'),
  hpText: document.getElementById('p2-hp-text'),
  nameEl: document.getElementById('p2-name'),
  imgEl: document.getElementById('p2-img')
});

function disableActions(state) {
  attackBtn.disabled = state;
  strongBtn.disabled = state;
  healBtn.disabled = state;
}

// AI simple turn for enemy
function enemyTurn() {
  if (!player2.isAlive() || !player1.isAlive()) return;
  // Random choice: attack or strong attack or heal
  const choice = Math.random();
  if (choice < 0.65) {
    const res = player2.attack(player1, false);
    logMessage(logEl, `${res.attacker} завдав ${res.dmg} шкоди ${res.defender}`);
  } else if (choice < 0.9) {
    const res = player2.attack(player1, true);
    logMessage(logEl, `${res.attacker} завдав сильну атаку на ${res.dmg} шкоди ${res.defender}`);
  } else {
    const healed = player2.heal(12);
    logMessage(logEl, `${player2.name} відновив ${healed} HP`);
  }
  checkEnd();
}

function checkEnd() {
  if (!player1.isAlive()) {
    logMessage(logEl, `${player1.name} програв!`);
    disableActions(true);
    return true;
  }
  if (!player2.isAlive()) {
    logMessage(logEl, `${player2.name} програв! Ви перемогли!`);
    disableActions(true);
    return true;
  }
  return false;
}

// Player actions
attackBtn.addEventListener('click', () => {
  if (disableIfEnded()) return;
  const res = player1.attack(player2, false);
  logMessage(logEl, `${res.attacker} завдав ${res.dmg} шкоди ${res.defender}`);
  if (!checkEnd()) {
    setTimeout(enemyTurn, 700);
  }
});

strongBtn.addEventListener('click', () => {
  if (disableIfEnded()) return;
  const res = player1.attack(player2, true);
  logMessage(logEl, `${res.attacker} виконав сильну атаку: ${res.dmg} шкоди`);
  if (!checkEnd()) {
    setTimeout(enemyTurn, 700);
  }
});

healBtn.addEventListener('click', () => {
  if (disableIfEnded()) return;
  const healed = player1.heal(14);
  logMessage(logEl, `${player1.name} відновив ${healed} HP`);
  if (!checkEnd()) {
    setTimeout(enemyTurn, 700);
  }
});

function disableIfEnded() {
  if (!player1.isAlive() || !player2.isAlive()) {
    disableActions(true);
    return true;
  }
  return false;
}

// init log
logMessage(logEl, 'Гра запущена. Ваша черга!');
