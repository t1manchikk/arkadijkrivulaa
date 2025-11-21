
// pokemon.js — модуль з класом Pokemon
export class Pokemon {
  /**
   * options: { name, maxHP, attackMin, attackMax, img }
   */
  constructor(options = {}) {
    const { name = 'Pokemon', maxHP = 100, attackMin = 5, attackMax = 18, img = '' } = options;
    this.name = name;
    this.maxHP = maxHP;
    this.currentHP = maxHP;
    this.attackMin = attackMin;
    this.attackMax = attackMax;
    this.img = img;
    // DOM refs will be bound later
    this.dom = {};
  }

  bindDom(selectors = {}) {
    // selectors: { hpFill, hpText, nameEl, imgEl }
    this.dom.hpFill = selectors.hpFill;
    this.dom.hpText = selectors.hpText;
    this.dom.nameEl = selectors.nameEl;
    this.dom.imgEl = selectors.imgEl;
    if (this.dom.nameEl) this.dom.nameEl.textContent = this.name;
    if (this.dom.imgEl && this.img) this.dom.imgEl.src = this.img;
    this.renderHP();
  }

  randomAttackPower(multiplier=1) {
    const base = Math.floor(Math.random()*(this.attackMax - this.attackMin + 1)) + this.attackMin;
    return Math.max(1, Math.floor(base * multiplier));
  }

  receiveDamage(dmg) {
    this.currentHP = Math.max(0, this.currentHP - dmg);
    this.renderHP();
    return dmg;
  }

  heal(amount) {
    const prev = this.currentHP;
    this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
    this.renderHP();
    return this.currentHP - prev;
  }

  isAlive() {
    return this.currentHP > 0;
  }

  renderHP() {
    if (this.dom.hpFill) {
      const pct = Math.round((this.currentHP / this.maxHP) * 100);
      this.dom.hpFill.style.width = pct + '%';
      if (pct <= 30) this.dom.hpFill.style.background = 'linear-gradient(90deg,#f97316,#ef4444)';
      else this.dom.hpFill.style.background = 'linear-gradient(90deg,var(--accent),#60a5fa)';
    }
    if (this.dom.hpText) {
      this.dom.hpText.textContent = `${this.currentHP} / ${this.maxHP} HP`;
    }
  }

  // simple attack that returns damage
  attack(target, strong=false) {
    const multiplier = strong ? 1.8 : 1;
    const dmg = this.randomAttackPower(multiplier);
    const inflicted = target.receiveDamage(dmg);
    return { dmg: inflicted, attacker: this.name, defender: target.name };
  }
}
