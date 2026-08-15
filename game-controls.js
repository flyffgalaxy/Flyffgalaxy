import { auth, savePlayer } from "./auth.js";
import { player, enemies, damageTexts, lootDrops } from "./game-core.js";
import { drawScene } from "./game-render.js";

document.addEventListener("keydown", async (e) => {
  const user = auth.currentUser;
  if (!user || player.hp <= 0) return;

  if (e.key === "ArrowUp") player.y -= 10;
  if (e.key === "ArrowDown") player.y += 10;
  if (e.key === "ArrowLeft") player.x -= 10;
  if (e.key === "ArrowRight") player.x += 10;

  if (e.key === " ") {
    enemies.forEach(enemy => {
      if (Math.abs(player.x - enemy.x) < 60 && Math.abs(player.y - enemy.y) < 60 && enemy.hp > 0) {
        let dmg = Math.floor(Math.random() * 15) + 5;
        enemy.hp -= dmg;
        player.exp += 5;
        damageTexts.push({ text: "-" + dmg, x: enemy.x+20, y: enemy.y, startY: enemy.y, color: "red" });

        let counter = Math.floor(Math.random() * 10) + 3;
        player.hp -= counter;
        damageTexts.push({ text: "-" + counter, x: player.x+20, y: player.y, startY: player.y, color: "blue" });

        if (enemy.hp <= 0) {
          player.exp += 20;
          damageTexts.push({ text: "+20 EXP", x: enemy.x+20, y: enemy.y, startY: enemy.y, color: "green" });

          if (Math.random() < 0.5) lootDrops.push({ x: enemy.x, y: enemy.y, type: "Potion" });

          enemy.hp = 40 + Math.floor(Math.random() * 40);
          enemy.x = 200 + Math.floor(Math.random() * 200);
          enemy.y = 100 + Math.floor(Math.random() * 200);
        }
      }
    });
  }

  if (e.key === "Enter") {
    lootDrops.forEach((loot, i) => {
      if (Math.abs(player.x - loot.x) < 40 && Math.abs(player.y - loot.y) < 40) {
        player.inventory.push(loot.type);
        lootDrops.splice(i, 1);
        damageTexts.push({ text: "Picked up " + loot.type, x: player.x, y: player.y, startY: player.y, color: "purple" });
      }
    });
  }

  if (player.exp >= 100) {
    player.level += 1;
    player.exp = 0;
    player.hp = 100;
    damageTexts.push({ text: "Level Up!", x: player.x, y: player.y, startY: player.y, color: "gold" });
  }

  if (player.hp <= 0) {
    setTimeout(() => {
      player.hp = 100;
      player.x = 50;
      player.y = 150;
      damageTexts.push({ text: "Respawned!", x: player.x, y: player.y, startY: player.y, color: "purple" });
    }, 2000);
  }

  drawScene();
  await savePlayer(user.uid);
});

// Start loop
function gameLoop() {
  drawScene();
  requestAnimationFrame(gameLoop);
}
gameLoop();
