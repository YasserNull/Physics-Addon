import { system, world } from '@minecraft/server';

function subtract(location, vector) {
    return {
        x: location.x - vector.x,
        y: location.y - vector.y,
        z: location.z - vector.z
    };
}

world.beforeEvents.playerBreakBlock.subscribe((EventData) => {
    const player = EventData.player;
    const block = EventData.block.type.id;
    system.run(() => {
    const blocks = player.dimension.spawnEntity("mc:block", subtract(EventData.block.location, { x: -0.500, y: -0.660, z: -0.500 }));
    const positionY = -0.300;
    const blockXYZ = [
        { x: 0, y: 0 + positionY, z: 0 },
        { x: 0.330, y: 0 + positionY, z: 0 },
        { x: -0.330, y: 0 + positionY, z: 0 },
        { x: 0.330, y: 0 + positionY, z: 0.330 },
        { x: -0.330, y: 0 + positionY, z: -0.330 },
        { x: 0.330, y: 0 + positionY, z: -0.330 },
        { x: -0.330, y: 0 + positionY, z: 0.330 },
        { x: 0, y: 0 + positionY, z: -0.330 },
        { x: 0, y: 0 + positionY, z: 0.330 },
        { x: 0, y: 0.330 + positionY, z: 0 },
        { x: 0.330, y: 0.330 + positionY, z: 0 },
        { x: -0.330, y: 0.330 + positionY, z: 0 },
        { x: 0.330, y: 0.330 + positionY, z: 0.330 },
        { x: -0.330, y: 0.330 + positionY, z: -0.330 },
        { x: 0.330, y: 0.330 + positionY, z: -0.330 },
        { x: -0.330, y: 0.330 + positionY, z: 0.330 },
        { x: 0, y: 0.330 + positionY, z: -0.330 },
        { x: 0, y: 0.330 + positionY, z: 0.330 },
        { x: 0, y: 0.660 + positionY, z: 0 },
        { x: 0.330, y: 0.660 + positionY, z: 0 },
        { x: -0.330, y: 0.660 + positionY, z: 0 },
        { x: 0.330, y: 0.660 + positionY, z: 0.330 },
        { x: -0.330, y: 0.660 + positionY, z: -0.330 },
        { x: 0.330, y: 0.660 + positionY, z: -0.330 },
        { x: -0.330, y: 0.660 + positionY, z: 0.330 },
        { x: 0, y: 0.660 + positionY, z: -0.330 },
        { x: 0, y: 0.660 + positionY, z: 0.330 },
    ];

    for (let i = 0; i < blockXYZ.length; i++) {
            const entity_block = blocks.dimension.spawnEntity("mc:block", subtract(blocks.location, blockXYZ[i]));
      entity_block.runCommand(`replaceitem entity @s slot.weapon.mainhand 0 ${block}`);
       entity_block.triggerEvent("mc:block_physics");
        entity_block.applyImpulse({x: Math.random() * 0.6 - 0.3,y: 0.2,z: Math.random() * 0.6 - 0.3});
    }
    blocks.runCommand("function kill029393939");          
}) 
})
