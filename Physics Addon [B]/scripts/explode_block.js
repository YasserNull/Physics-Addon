import { system, world } from "@minecraft/server";
import { distance, getDirection } from "utilities.js";
import { explode_block_limit } from "config.js";

world.beforeEvents.explosion.subscribe((e) => {
    const existingBlocks = e.source.dimension.getEntities({ type: "mc:block" }).length;
    
    const remainingBlocks = explode_block_limit - existingBlocks;
    if (remainingBlocks <= 0) return;
    const allowedBlocks = e.getImpactedBlocks().slice(0, remainingBlocks);
    
    const center = e.source.location;
    const power = Math.sqrt(allowedBlocks.length / Math.PI) * 2;
    
    for (const block of allowedBlocks) {
        const type = block.typeId;
        const blockCenter = block.center();
        // Calculate distance with a minimum value to avoid division by zero
        let dist = Math.max(distance(center, blockCenter), 0.1);

        // Calculate the direction of the impulse
        let direction = getDirection(center, blockCenter);

        // Inverse square law for force
        let force = power / (dist * dist);

        // Apply a gradual height factor
        let verticalBoost = 1 + (1 - Math.min(dist / 10, 1));

        // Calculate the final impulse
        let impulse = {
            x: direction.x * force,
            y: direction.y * force * verticalBoost, // Increase height for nearby blocks
            z: direction.z * force
        };
        
        system.run(() => {
            const mcBlock = block.dimension.spawnEntity("mc:block", blockCenter);
            mcBlock.triggerEvent("mc:explode_block");
            mcBlock.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${type}`);
            mcBlock.applyImpulse(impulse);
        });
    }
});
