/*

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes.
The console.log() statements should still return what is expected of them.

*/

/*
  === GameObject ===
  * createdAt
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/
class GameObject {
  constructor(charAttrs) {
    this.createdAt = charAttrs.createdAt;
    this.dimensions = charAttrs.dimensions;
  }

  destroy() {
    this.name = this.name ? this.name : "Object";
    return `${this.name} was removed from the game`;
  }
}

/*
  === CharacterStats ===
  * healthPoints
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/
class CharacterStats extends GameObject {
  constructor(charAttrs) {
    super(charAttrs);
    this.healthPoints = charAttrs.healthPoints;
    this.name = charAttrs.name;
  }

  takeDamage() {
    return `${this.name} took damage`;
  }
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
class Humanoid extends CharacterStats {
  constructor(charAttrs) {
    super(charAttrs);

    this.team = charAttrs.team;
    this.weapons = charAttrs.weapons;
    this.language = charAttrs.language;
  }
  greet() {
    return `${this.name} offers a greeting in ${this.language}.`;
  }
}

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by un-commenting these 3 objects and the list of console logs below:

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

class Hero extends Humanoid {
  constructor(charAttrs) {
    super(charAttrs);
  }

  shieldBash(target, damage) {
    if (this.weapons.includes("Shield")) {
      target.healthPoints -= damage;
      console.log(
        `${this.name} did ${damage} damage to ${target.name} with Shield Bash`
      );
    } else {
      console.log(
        `${this.name} tried to Shield Bash but forgot he doesn't have a shield.`
      );
    }
  }

  slash(target, damage) {
    // This would need to be updated to have a library of weapons that can use
    // an attack then just check for the character's weapons for anything in
    // the library.  But this is just a simple example....right? :P
    if (this.weapons.includes("Sword") || this.weapons.includes("Dagger")) {
      target.healthPoints -= damage;
      console.log(
        `${this.name} did ${damage} damage to ${target.name} with Slash`
      );
    } else {
      console.log(
        `${this.name} wanted to slash but didn't have the right weapon`
      );
    }
  }
}

class Villain extends Humanoid {
  constructor(charAttrs) {
    super(charAttrs);
  }

  choke(target, damage) {
    target.healthPoints -= damage;
    console.log(
      `${this.name} did ${damage} damage to ${target.name} with Choke`
    );
  }

  shrink(target) {
    target.dimensions.height = Math.floor(target.dimensions.height / 2);
    console.log(`${this.name} shrunk ${target.name} to half his height!`);
  }
}

const hero = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lord Beef Broth",
  team: "Forest Kingdom",
  weapons: ["Sword", "Shield"],
  language: "Elvish"
});
const villain = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Pancake Slapper",
  team: "Castle Kingdom",
  weapons: ["Sword", "Shield"],
  language: "Elvish"
});

hero.shieldBash(villain, 2);
villain.choke(hero, 1);
hero.slash(villain, 3);
villain.shrink(hero);
