export function subtract(location, vector3) {
    return {
        x: location.x - vector3.x,
        y: location.y - vector3.y,
        z: location.z - vector3.z
    };
}
