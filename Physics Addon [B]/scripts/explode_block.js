import { system, world } from "@minecraft/server";
import { subtract } from "utilities.js";

world.afterEvents.blockExplode.subscribe((e) => {
    const block = e.block;
    const block_id = e.explodedBlockPermutation.type.id;
    const mc_block = block.dimension.spawnEntity("mc:block", subtract(block.location, { x: -0.5, y: 0, z: -0.5 }));
    mc_block.triggerEvent("mc:explode_block");
    mc_block.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${block_id}`);
});
