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

const DUCK_HUNT_AT_HOME = Object.freeze({
    TITLE: "Duck Hunt at Home",
    ABOUT: `Duck Hunt at Home was a game project I created to learn Godot in a 3D context. The game is an endless arena shooter where enemies are constantly respawning, and you must eliminate the ducks to earn points.

    The game is loosely inspired by the old Nintendo series Duck Hunt where you shoot ducks flying across the screen. In this re-imagining, the ducks are coming are coming after you and you must survive for as long as possible.

    Through creating this project, it helped solidify my foundations in working within a 3D environment, as well as improving my code architecturing. I've also learned from some of the shortcomings from this project, such as the lack of object pooling, which is the cause of the game's performannce issues.
    `,
    CREDITS: [
        "The project was made using open source Godot 4.2.2 Game Engine",
        // TODO: Look at the credits later
    ]
});

const PAWSITIVE = Object.freeze({
    TITLE: "PAWsitive",
    ABOUT: `PAWsitive was a hackathon submission for BCIT's QDS 2024 Hackathon, where the project was the <b>first place winner</b>. The project is a proof of concept towards a mobile app that rewarded players with in-game currency whenever player's did any healthy activities, this includes exercise and meditation. After obtaining the currency, players can use it to pull for cute outfits and pets that they can decorate their avatar with.

    The initial concept came from the idea that "gacha games" tend to have addictive elements to them that keeps their players hooked. We thought instead of using those addictive elements to exploit players, we should instead use them to build healthy habits in our players.
    `
});

const Projects = Object.freeze({
    TERRAIN_GENERATOR_SIMULATOR: TERRAIN_GENERATOR_SIMULATOR,
    DUCK_HUNT_AT_HOME: DUCK_HUNT_AT_HOME,
    PAWSITIVE: PAWSITIVE
});