export { Projects }

const TERRAIN_GENERATOR_SIMULATOR = Object.freeze({
    TITLE: "Terrain Generator Simulator",
    ABOUT: `This project was made as a proof of concept for a larger idea for a mobile game, one which every player has their own randomly generated island they can customize themselves, similar to that of Animal Crossing New Horizons.

    The island was generated using Perlin noise maps, which determined the elevation of each tile on the island. Each time the generate button is pressed a new noise map is used to create the island. Currently each tile is completely random, future considerations is to use noise maps to determine an area's "biome", where the appropriate tiles can then be selected based on the biome type.`,
    CREDITS: [
        "Tiles were made by Kenney's free game assets (Patreon: https://www.patreon.com/kenney)",
        "The project was made using the open source Godot 4.2.2 Game Engine",
        "Water shader made by paddy-exe found on Godot Shaders"
    ]
});

const Projects = Object.freeze({
    TERRAIN_GENERATOR_SIMULATOR: TERRAIN_GENERATOR_SIMULATOR
});