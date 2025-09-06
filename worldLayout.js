// World Layout Configuration
export const worldConfig = {
    // World dimensions
    size: 10000,  // World size (radius)
    
    // Urban areas (cities and towns)
    urbanAreas: [
        // Main cities
        { x: -3000, z: -2000, radius: 1200, type: 'city', name: 'Ciudad Norte' },
        { x: 2500, z: 1500, radius: 1000, type: 'city', name: 'Ciudad Sur' },
        
        // Smaller towns
        { x: -1000, z: 3000, radius: 600, type: 'town', name: 'Pueblo del Este' },
        { x: 3500, z: -2500, radius: 700, type: 'town', name: 'Pueblo Oeste' },
        { x: -3500, z: 1000, radius: 500, type: 'town', name: 'Villa Norte' },
        { x: 2000, z: 3500, radius: 550, type: 'town', name: 'Villa Sur' }
    ],
    
    // Rivers (flowing from high to low elevation)
    rivers: [
        {
            name: 'Río Norte',
            points: [
                { x: -4500, z: -4000, width: 60 },
                { x: -3000, z: -3500, width: 70 },
                { x: -1500, z: -3000, width: 80 },
                { x: 0, z: -2000, width: 90 },
                { x: 2000, z: -1000, width: 100 },
                { x: 4000, z: 0, width: 110 },
                { x: 5000, z: 2000, width: 120 }
            ]
        },
        {
            name: 'Río Sur',
            points: [
                { x: 4000, z: -4500, width: 50 },
                { x: 2000, z: -3500, width: 60 },
                { x: 0, z: -2500, width: 70 },
                { x: -1500, z: -1500, width: 80 },
                { x: -2000, z: 0, width: 90 },
                { x: -2500, z: 2000, width: 100 },
                { x: -3000, z: 4000, width: 110 }
            ]
        }
    ],
    
    // Lakes (in natural depressions)
    lakes: [
        { x: -2000, z: 2500, radius: 500, name: 'Lago Esmeralda' },
        { x: 3000, z: -1000, radius: 400, name: 'Lago Azul' },
        { x: -3500, z: -1000, radius: 300, name: 'Laguna Norte' },
        { x: 4000, z: 3000, radius: 600, name: 'Laguna del Sur' }
    ],
    
    // Forests (around water sources and in non-arable land)
    forests: [
        { x: -3500, z: -3500, radius: 1200, density: 0.8, name: 'Bosque del Norte' },
        { x: 4000, z: 3000, radius: 1500, density: 0.9, name: 'Bosque del Sur' },
        { x: 0, z: 4000, radius: 1000, density: 0.7, name: 'Bosque del Este' },
        { x: 4500, z: -3500, radius: 800, density: 0.6, name: 'Bosque del Oeste' }
    ],
    
    // Farmland (in flat areas between cities)
    farmlands: [
        { x: 0, z: 0, width: 2000, height: 1500, rotation: Math.PI/4 },
        { x: -2000, z: -2000, width: 1800, height: 1200, rotation: -Math.PI/6 },
        { x: 2000, z: 2000, width: 1600, height: 1400, rotation: Math.PI/8 }
    ],
    
    // Road network configuration
    roads: {
        // Highways (connect major cities)
        highways: [
            { from: 'Ciudad Norte', to: 'Ciudad Sur', lanes: 4, speedLimit: 120 },
            { from: 'Ciudad Norte', to: 'Pueblo del Este', lanes: 2, speedLimit: 90 },
            { from: 'Ciudad Sur', to: 'Pueblo Oeste', lanes: 2, speedLimit: 90 },
            { from: 'Pueblo del Este', to: 'Villa Sur', lanes: 2, speedLimit: 90 },
            { from: 'Pueblo Oeste', to: 'Villa Norte', lanes: 2, speedLimit: 90 }
        ],
        
        // Local roads (connect towns and villages)
        localRoads: [
            // Roads around Ciudad Norte
            { type: 'ring', center: 'Ciudad Norte', radius: 800, lanes: 2 },
            { type: 'radial', center: 'Ciudad Norte', angle: 0, length: 1000, lanes: 2 },
            { type: 'radial', center: 'Ciudad Norte', angle: Math.PI/2, length: 1000, lanes: 2 },
            
            // Roads around Ciudad Sur
            { type: 'ring', center: 'Ciudad Sur', radius: 700, lanes: 2 },
            { type: 'radial', center: 'Ciudad Sur', angle: Math.PI, length: 1000, lanes: 2 },
            { type: 'radial', center: 'Ciudad Sur', angle: -Math.PI/2, length: 1000, lanes: 2 }
        ]
    },
    
    // Terrain features
    terrain: {
        // Elevation map (simplified for this example)
        elevation: [
            // Higher elevations in the north and west
            { x: -4000, z: -4000, height: 200 },
            { x: -4000, z: 0, height: 150 },
            { x: 0, z: -4000, height: 180 },
            // Lower elevations in the south and east
            { x: 4000, z: 4000, height: 20 },
            { x: 0, z: 4000, height: 50 },
            { x: 4000, z: 0, height: 30 }
        ],
        
        // Biome types
        biomes: [
            { x: -4000, z: -4000, type: 'mountain' },
            { x: 0, z: 0, type: 'plains' },
            { x: 4000, z: 4000, type: 'wetland' }
        ]
    },
    
    // Get urban area by name
    getUrbanArea: function(name) {
        return this.urbanAreas.find(area => area.name === name);
    },
    
    // Check if a point is in any urban area
    isInUrbanArea: function(x, z) {
        return this.urbanAreas.some(area => {
            const dx = x - area.x;
            const dz = z - area.z;
            return Math.sqrt(dx * dx + dz * dz) <= area.radius;
        });
    },
    
    // Check if a point is in water
    isInWater: function(x, z) {
        // Check rivers
        for (const river of this.rivers) {
            for (let i = 0; i < river.points.length - 1; i++) {
                const p1 = river.points[i];
                const p2 = river.points[i + 1];
                const width = (p1.width + p2.width) / 2;
                
                if (this.pointNearLine(x, z, p1.x, p1.z, p2.x, p2.z, width)) {
                    return true;
                }
            }
        }
        
        // Check lakes
        for (const lake of this.lakes) {
            const dx = x - lake.x;
            const dz = z - lake.z;
            if (Math.sqrt(dx * dx + dz * dz) <= lake.radius) {
                return true;
            }
        }
        
        return false;
    },
    
    // Helper function to check if a point is near a line segment
    pointNearLine: function(px, pz, x1, z1, x2, z2, maxDistance) {
        // Vector from line start to end
        const lineVec = { x: x2 - x1, z: z2 - z1 };
        const lineLength = Math.sqrt(lineVec.x * lineVec.x + lineVec.z * lineVec.z);
        
        // Normalize line vector
        const lineDir = { x: lineVec.x / lineLength, z: lineVec.z / lineLength };
        
        // Vector from line start to point
        const pointVec = { x: px - x1, z: pz - z1 };
        
        // Project point onto line
        const projLength = pointVec.x * lineDir.x + pointVec.z * lineDir.z;
        
        // Find closest point on line segment
        let closest;
        if (projLength < 0) {
            closest = { x: x1, z: z1 }; // Beyond line start
        } else if (projLength > lineLength) {
            closest = { x: x2, z: z2 }; // Beyond line end
        } else {
            closest = {
                x: x1 + lineDir.x * projLength,
                z: z1 + lineDir.z * projLength
            };
        }
        
        // Distance from point to closest point on line
        const dx = px - closest.x;
        const dz = pz - closest.z;
        const distance = Math.sqrt(dx * dx + dz * dz);
        
        return distance <= maxDistance;
    },
    
    // Get the biome at a specific point
    getBiomeAt: function(x, z) {
        // Simple implementation - in a real game, you'd use noise functions
        // or a more sophisticated biome system
        
        // Check if in water
        if (this.isInWater(x, z)) {
            return 'water';
        }
        
        // Check urban areas
        if (this.isInUrbanArea(x, z)) {
            return 'urban';
        }
        
        // Check forests
        for (const forest of this.forests) {
            const dx = x - forest.x;
            const dz = z - forest.z;
            if (Math.sqrt(dx * dx + dz * dz) <= forest.radius) {
                return 'forest';
            }
        }
        
        // Default to plains
        return 'plains';
    },
    
    // Get elevation at a point (simplified)
    getElevation: function(x, z) {
        // Simple implementation - in a real game, you'd use noise functions
        // or a heightmap for more realistic terrain
        
        // Calculate distance to each elevation point and interpolate
        let totalWeight = 0;
        let weightedSum = 0;
        
        for (const point of this.terrain.elevation) {
            const dx = x - point.x;
            const dz = z - point.z;
            const distanceSq = dx * dx + dz * dz;
            
            if (distanceSq < 0.0001) {
                return point.height; // Exact match
            }
            
            const weight = 1 / distanceSq;
            weightedSum += point.height * weight;
            totalWeight += weight;
        }
        
        return weightedSum / totalWeight;
    }
};

// Export the configuration
export default worldConfig;
