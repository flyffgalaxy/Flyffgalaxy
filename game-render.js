import { player, enemies, damageTexts, lootDrops } from "./game-core.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

export function drawScene() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  ctx.fillText("HP: " + player.hp, 10, 20);
  ctx.fillText("EXP: " + player.exp, 10, 40);
  ctx.fillText("Level: " + player.level, 10, 60);
  ctx.fillText("Job: " + player.job, 10, 80);

  enemies.forEach(enemy => {
    if (enemy.hp > 0) {
      ctx.fillStyle = "red";
      ctx.fillRect(enemy.x, enemy.y, 30, 30);
    }
  });

  lootDrops.forEach(loot => {
    ctx.fillStyle = "blue";
    ctx.fillRect(loot.x, loot.y, 20, 20);
  });

  damageTexts.forEach((dmg, i) => {
    ctx.fillStyle = dmg.color;
    ctx.fillText(dmg.text, dmg.x, dmg.y);
    dmg.y -= 1;
    if (dmg.y < dmg.startY - 30) damageTexts.splice(i, 1);
  });

  ctx.fillStyle = "green";
  ctx.fillRect(player.x, player.y, 30, 30);
}
window.drawScene = drawScene;
