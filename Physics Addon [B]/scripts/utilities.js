export function subtract(location, vector3) {
    return {
        x: location.x - vector3.x,
        y: location.y - vector3.y,
        z: location.z - vector3.z
    };
}

export function distance(vector1, vector2) {
    return Math.sqrt((vector1.x - vector2.x) ** 2 + (vector1.y - vector2.y) ** 2 + (vector1.z - vector2.z) ** 2);
}

export function getDirection(vector1, vector2) {
    let dist = distance(vector1, vector2);
    return {
        x: (vector2.x - vector1.x) / dist,
        y: (vector2.y - vector1.y) / dist,
        z: (vector2.z - vector1.z) / dist
    };
}