import { player, enemies, damageTexts, lootDrops } from "./game-core.js";
import { drawScene } from "./game-render.js";

let isFlying = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.x += 10;
  if (e.key === "ArrowLeft") player.x -= 10;
  if (e.key === "ArrowUp") player.y -= 10;
  if (e.key === "ArrowDown") player.y += 10;

  if (e.key === " ") {
    enemies.forEach(enemy => {
      if (Math.abs(player.x - enemy.x) < 40 && Math.abs(player.y - enemy.y) < 40 && enemy.hp > 0) {
        enemy.hp -= 10;
        damageTexts.push({ text: "-10", x: enemy.x, y: enemy.y, startY: enemy.y, color: "red" });
        if (enemy.hp <= 0) {
          player.exp += 10;
          lootDrops.push({ x: enemy.x, y: enemy.y, item: "Potion" });
        }
      }
    });
  }

  if (e.key === "f") {
    isFlying = !isFlying;
    damageTexts.push({ text: isFlying ? "Flying!" : "Landed!", x: player.x, y: player.y, startY: player.y, color: "cyan" });
  }

  drawScene();
});
