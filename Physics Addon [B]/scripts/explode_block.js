import { system, world } from "@minecraft/server";
import { subtract } from "utilities.js";

let ExplosionLoc;
let ExplosionPow;

world.beforeEvents.explosion.subscribe((e) => {
    ExplosionLoc = e.source.location;
    ExplosionPow = Math.sqrt(parseInt(e.getImpactedBlocks().length) / Math.PI).toFixed(2);
});

world.afterEvents.blockExplode.subscribe((e) => {
    const block = e.block;
    const block_id = e.explodedBlockPermutation.type.id;
    const impulseVector = {
        x: (block.location.x - ExplosionLoc.x) * ExplosionPow,
        y: (block.location.y - ExplosionLoc.y) * ExplosionPow,
        z: (block.location.z - ExplosionLoc.z) * ExplosionPow
    };
    system.run(() => {
        const mc_block = block.dimension.spawnEntity("mc:block", subtract(block.location, { x: -0.5, y: 0, z: -0.5 }));
        mc_block.triggerEvent("mc:explode_block");
        mc_block.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${block_id}`);
        mc_block.applyImpulse(impulseVector);
    });
});