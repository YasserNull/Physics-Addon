import { system, world } from "@minecraft/server";
import { distance , getDirection } from "utilities.js";

world.beforeEvents.explosion.subscribe((e) => {
    let center = e.source.location;
    let power = Math.sqrt(e.getImpactedBlocks().length / Math.PI) * 2;
    const exist_block_count = block.dimension.getEntities({ type: "mc:block" }).length;
   
    let block_count;
    if (exist_block_count >= 12) {
        block_count = 0;
    } else {
    	block_count = e.getImpactedBlocks().length;
    }
    
    for (let block of e.getImpactedBlocks()) {
    	if (block == block_count) {
     	   break;
        }
        let type = block.typeId;
        let blockCenter = block.center();
        
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
            const mc_block = block.dimension.spawnEntity("mc:block", blockCenter);
            mc_block.triggerEvent("mc:explode_block");
            mc_block.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${type}`);
            mc_block.applyImpulse(impulse);
        });
    }
})
