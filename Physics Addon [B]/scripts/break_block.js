import { system, world } from "@minecraft/server";
import { subtract } from "utilities.js";

const offsets = [
    { x: -0.165, y: -0.15, z: -0.165 }, { x: -0.5, y: -0.15, z: -0.165 }, { x: -0.833, y: -0.15, z: -0.165 },
    { x: -0.165, y: -0.15, z: -0.5 },   { x: -0.5, y: -0.15, z: -0.5 },   { x: -0.833, y: -0.15, z: -0.5 },
    { x: -0.165, y: -0.15, z: -0.833 }, { x: -0.5, y: -0.15, z: -0.833 }, { x: -0.833, y: -0.15, z: -0.833 },
    { x: -0.165, y: -0.485, z: -0.165 }, { x: -0.5, y: -0.485, z: -0.165 }, { x: -0.833, y: -0.485, z: -0.165 },
    { x: -0.165, y: -0.485, z: -0.5 },   { x: -0.5, y: -0.485, z: -0.5 },   { x: -0.833, y: -0.485, z: -0.5 },
    { x: -0.165, y: -0.485, z: -0.833 }, { x: -0.5, y: -0.485, z: -0.833 }, { x: -0.833, y: -0.485, z: -0.833 },
    { x: -0.165, y: -0.81, z: -0.165 },  { x: -0.5, y: -0.81, z: -0.165 },  { x: -0.833, y: -0.81, z: -0.165 },
    { x: -0.165, y: -0.81, z: -0.5 },    { x: -0.5, y: -0.81, z: -0.5 },    { x: -0.833, y: -0.81, z: -0.5 },
    { x: -0.165, y: -0.81, z: -0.833 },  { x: -0.5, y: -0.81, z: -0.833 },  { x: -0.833, y: -0.81, z: -0.833 },
];

world.afterEvents.playerBreakBlock.subscribe((e) => {
    const block = e.block;
    const block_id = e.brokenBlockPermutation.type.id;
    const exist_block_count = block.dimension.getEntities({ type: "mc:block" }).length;

    let block_count;
    if (exist_block_count >= 80) {
        block_count = 0;
    } else if (exist_block_count >= 65) {
        block_count = Math.floor(Math.random() * (10 - 2 + 1)) + 2;
    } else if (exist_block_count >= 45) {
        block_count = Math.floor(Math.random() * (18 - 10 + 1)) + 10;
    } else {
        block_count = Math.floor(Math.random() * (27 - 18 + 1)) + 18;
    }

    system.run(() => {
        for (let i = 0; i < block_count; i++) {
            let offset = offsets[i];
            const mc_block = block.dimension.spawnEntity("mc:block", subtract(block.location, offset));
            mc_block.triggerEvent("mc:break_block");

            try {
                mc_block.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${block_id}`);
            } catch {}

            mc_block.applyImpulse({
                x: Math.random() * 0.6 - 0.3,
                y: 0.2,
                z: Math.random() * 0.6 - 0.3
            });
        }
    });
})
