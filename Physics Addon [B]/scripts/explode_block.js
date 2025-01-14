import { system, world } from "@minecraft/server";
import { subtract } from "utilities.js";

let ExplosionLoc;
world.beforeEvents.explosion.subscribe((e) => {
     ExplosionLoc = e.source.location;
})
function calculateDistance(loc1, loc2) {
    return Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2) + Math.pow(loc2.z - loc1.z, 2));
}


        world.afterEvents.blockExplode.subscribe((e2) => {
            const block = e2.block;
            const block_id = e2.explodedBlockPermutation.type.id;
            const distance = calculateDistance(ExplosionLoc, block.location);
const force = Math.max(0, 8 / Math.pow(distance, 2)); 
const impulse = {
    x: Math.random() * force - force / 2,
    y: Math.random() * force / 2,
    z: Math.random() * force - force / 2
};
    system.run(() => {
            const mc_block = block.dimension.spawnEntity("mc:block", subtract(block.location, { x: -0.5, y: 0, z: -0.5 }));
            mc_block.triggerEvent("mc:explode_block");
            mc_block.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${block_id}`);
            mc_block.applyImpulse(impulse); 
        
    });
});