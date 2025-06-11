export { Projects }

const TERRAIN_GENERATOR_SIMULATOR = Object.freeze({
    TITLE: "Terrain Generator Simulator",
    ABOUT: `    This project was made as a proof of concept for a larger idea for a mobile game, one in which every player has their own randomly generated island they can customize themselves, similar to that of Animal Crossing New Horizons.

    The island was generated using Perlin noise maps, which determined the elevation of each tile on the island. Each time the generate button is pressed a new noise map is used to create the island. Currently each tile is completely random, a future consideration is to use noise maps to determine an area's "biome", where the appropriate tiles can then be selected based on the biome type.`,
    IMAGES: [
        "/images/previews/terrainGeneratorSimulator/demo.gif"
    ]
});

const DUCK_HUNT_AT_HOME = Object.freeze({
    TITLE: "Duck Hunt at Home",
    ABOUT: `    Duck Hunt at Home was a game project I created to learn Godot in a 3D context. The game is an endless arena shooter where enemies are constantly respawning, and you must eliminate the ducks to earn points.

    The game is loosely inspired by the old Nintendo series Duck Hunt where you shoot ducks flying across the screen. In this re-imagining, the ducks are coming after you and you must survive for as long as possible.

    Creating this project helped solidify my foundations in working within a 3D environment, as well as improving my code architecture. I've also learned from some of the shortcomings of this project, such as the lack of object pooling, which is the cause of the game's performance issues.
    `,
    IMAGES: [
        "/images/previews/duckHuntAtHome/city.gif",
        "/images/previews/duckHuntAtHome/plains.gif",
        "/images/previews/duckHuntAtHome/space.gif",
        "/images/previews/duckHuntAtHome/levels.gif",
        "/images/previews/duckHuntAtHome/menu.gif"
    ]
});

const PAWSITIVE = Object.freeze({
    TITLE: "PAWsitive",
    ABOUT: `    PAWsitive was a hackathon submission for BCIT's QDS 2024 Hackathon, where the project was the <b>first place winner</b>. The project is a proof of concept towards a mobile app that rewarded players with in-game currency whenever players did any healthy activities, including exercise and meditation. After obtaining the currency, players can use it to obtain cute outfits and pets that they can decorate their avatar with.

    The initial concept came from the idea that "gacha games" tend to have addictive elements to them that keep their players hooked. We thought instead of using those addictive elements to exploit players, we should use them instead to build healthy habits in our players.
    `,
    IMAGES: [
        "/images/previews/PAWsitive/homepage.png"
    ]
});

const SWING = Object.freeze({
    TITLE: "Swing",
    ABOUT: `    Swing was the first game project I ever made when I was starting my programming journey. The game is a simple endless runner inspired by Flappy Bird. I created this project for the final assignment of the CS50x course on edX, where I dedicated a week to creating this project.

        Swing was made with the PyGames library, since Python was the first language I was using at the time. The game helped me learn basic concepts such as game loops, collision detection, and basic physics. Nowadays I am capable of producing games like this in less than a day and I'm reminded of how far I've come since then.
    `,
    IMAGES: [
        "/images/previews/swing/ingame.gif",
        "/images/previews/swing/title.PNG"
    ]
});

const TOUHOU_AT_HOME = Object.freeze({
    TITLE: "Touhou at Home",
    ABOUT: `    Touhou at Home was a project I created to learn the basics of Godot. The game is a simple bullet hell game inspired by the Touhou series, in which the player must dodge an endless barrage of bullets to survive.

        The game was created within a week, during which I learned the basics of Godot's scene systems, signals, and basic 2D physics. Creating this project was also the first time I truly felt the importance of good code architecture, as the project quickly became incredibly difficult to extend as the project grew in complexity. Upon reflection, there were many different ways I could have improved the architecture such as using signals or decomposing objects further. Overall, the project was an incredible learning experience that helped me be more conscientious of my code architecture.
    `,
    IMAGES: [
        "/images/previews/touhouAtHome/demo.png"
    ]
});

const ZOOM_TO_HOME = Object.freeze({
    TITLE: "Zoom to Home",
    ABOUT: `    Zoom to Home is the project I am currently working on. The game is a 3D first-person platformer, where the player needs to run through a series of obstacles as fast as possible to reach the goal ring and make it home. Currently I have completed the core physics and movement mechanics, as well as the tutorial. The next steps are to create more levels, design a menu, and a saving system to record the player's fastest times per level.

        The game was a summer project I worked on during the break from BCIT's CST program. In my last project, Duck Hunt at Home, I found that the grappling hook mechanic was fun to play with, so I decided to expand on that idea and create a game around it. The game was a great opportunity to implement the fixes to the mistakes I made in Duck Hunt at Home, such as better code architecture.
    `,
    IMAGES: [
        "/images/previews/zoomToHome/tutorial.png",
        "/images/previews/zoomToHome/goal.png",
        "/images/previews/zoomToHome/result.png"
    ]
});

const SPIN_THE_BARREL = Object.freeze({
    TITLE: "Spin the Barrel",
    ABOUT: `    Spin The Barrel was a term project for one of my courses at BCIT. The game was inspired by "Liar's Bar" where four players sit at one table and take turns spinning a nerf gun barrel and shooting themselves.

        The game was an opportunity to learn about Godot's multiplayer capabilities, where I learned the basics of creating a multiplayer game. Unfortunately, due to both the fast deadline and our first time working with Godot's multiplayer, the game accumulated significant technical debt that would require significant refactoring. The game likely will not be released, but it was a valuable learning experience for future multiplayer projects.
    `,
    IMAGES: [
        "/images/previews/spinTheBarrel/ingame.png",
        "/images/previews/spinTheBarrel/characterSelect.png",
        "/images/previews/spinTheBarrel/title.png",
    ]
});

const AI_GAMER = Object.freeze({
    TITLE: "Can AI Play Games (Suika At Home)",
    ABOUT: `    Can AI Play Games (Suika At Home) was another term project for one of my courses at BCIT. The premise was to teach an AI how to play a simple game using a neural network. The algorithm I used for this project was NEAT (NeuroEvolution Augmenting Topology), provided by GitHub user pastra98.

        The game was an opportunity to learn about how neural networks work and how to apply them to games. As for the choice of game, I wanted it to be something that was simple in mechanics, but not too simple such that I couldn't challenge myself with difficult problems. I ended up choosing Suika Game (translated to Watermelon Game) because of its minimal player input, but complexity in its object interactions.
    `,
    IMAGES: [
        "/images/previews/AIGamer/mainMenu.png",
        "/images/previews/AIGamer/gameplay.png",
        "/images/previews/AIGamer/gameplay2.png"
    ]
});

const Projects = Object.freeze({
    TERRAIN_GENERATOR_SIMULATOR: TERRAIN_GENERATOR_SIMULATOR,
    DUCK_HUNT_AT_HOME: DUCK_HUNT_AT_HOME,
    PAWSITIVE: PAWSITIVE,
    SWING: SWING,
    TOUHOU_AT_HOME: TOUHOU_AT_HOME,
    ZOOM_TO_HOME: ZOOM_TO_HOME,
    SPIN_THE_BARREL: SPIN_THE_BARREL,
    AI_GAMER: AI_GAMER
});