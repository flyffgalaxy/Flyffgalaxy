import { player, enemies, damageTexts, lootDrops } from "./game-core.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const sprite = new Image();
sprite.src = "https://i.imgur.com/4AiXzf8.png";
const enemySprite = new Image();
enemySprite.src = "https://i.imgur.com/2yaf2wb.png";
const potionSprite = new Image();
potionSprite.src = "https://i.imgur.com/1XQnFqT.png";

export function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (player.hp > 0) {
    ctx.drawImage(sprite, player.x, player.y, 50, 50);
  } else {
    ctx.fillStyle = "gray";
    ctx.font = "20px Arial";
    ctx.fillText("You Died! Respawning...", canvas.width/2 - 80, canvas.height/2);
  }

  enemies.forEach(enemy => {
    if (enemy.hp > 0) ctx.drawImage(enemySprite, enemy.x, enemy.y, 50, 50);
  });

  lootDrops.forEach(loot => {
    ctx.drawImage(potionSprite, loot.x, loot.y, 30, 30);
  });

  damageTexts.forEach((dmg, i) => {
    ctx.fillStyle = dmg.color;
    ctx.font = "16px Arial";
    ctx.fillText(dmg.text, dmg.x, dmg.y);
    dmg.y -= 1;
    if (dmg.y < dmg.startY - 30) damageTexts.splice(i, 1);
  });

  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  ctx.fillText("HP: " + player.hp, 10, 20);
  ctx.fillText("EXP: " + player.exp, 10, 40);
  ctx.fillText("Level: " + player.level, 10, 60);
  ctx.fillText("Inventory: " + (player.inventory.length ? player.inventory.join(", ") : "Empty"), 10, 80);
}
