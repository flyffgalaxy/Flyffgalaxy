export let player = { 
  x: 50, y: 150, hp: 100, mp: 50, exp: 0, level: 1, 
  inventory: [], job: "Vagrant" 
};

export let enemies = [
  { x: 300, y: 150, hp: 50 },
  { x: 400, y: 200, hp: 70 },
  { x: 250, y: 100, hp: 30 }
];

export let damageTexts = [];
export let lootDrops = [];

export const jobs = {
  Vagrant: { next: ["Mercenary", "Magician", "Acrobat", "Assist"], levelReq: 15 },
  Mercenary: { skills: ["Slash", "Keenwheel"] },
  Magician: { skills: ["Fireball", "Icebolt"] },
  Acrobat: { skills: ["Arrow Shot", "Yo-Yo Strike"] },
  Assist: { skills: ["Heal", "Buff"] }
};
