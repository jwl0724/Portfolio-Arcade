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

const PAINTED_REVERIE = Object.freeze({
    TITLE: "Painted Reverie",
    ABOUT: `    Painted Reverie is a first person horror game created for SCREAM JAM 2025. It was made in Unity with a group of friends to see how scary we could make a game, as well as trying out a game jam for the first time.

        The game is a loose adaptation of the chinese story called "The Painted Skin". You play as Wang, where you relive the final moments of his life and attempt to change his fate by collecting objects of mystical power. You can check out the itch.io page <a href="https://jackywucoder.itch.io/painted-reverie" target="_blank" rel="noopener noreferrer"">here!</a>

        This game was the first time I worked on a game with very tight deadline, especially important within a group environment. Before the jam there were so many ideas that our group came up with during the ideation phase of development. We wanted to implement so many unique mechanics that would make the game much scarier to play through. As development went on, we quickly realized we would not be able to implement everything we wanted to and we had to cut lots of planned features in order to meet the deadline. Development also proved tricky trying to coordinate everyone in the project, since everyone has their own personal schedules that would sometimes clash with other member's schedules.

        Fortunately we were able to pull through despite the difficulties, and the experience has made me much better at realizing and handling scope creep. I found myself much more easily able to identify what is possible and what isn't given a time window. I also found myself able to coordinate with others much more effectively after this experience, due to the nature of the tight deadline. Communication was essential and coordinating the work between everyone was crucial for allowing us to finish this project on time.
    `,
    IMAGES: [
        "https://img.itch.zone/aW1hZ2UvMzk2NTc1OC8yMzY0ODE3OS5wbmc=/original/VbAIpj.png",
        "https://img.itch.zone/aW1hZ2UvMzk2NTc1OC8yMzY0Nzc2OC5wbmc=/original/pW1ax4.png",
        "https://img.itch.zone/aW1hZ2UvMzk2NTc1OC8yMzY0Nzc2OS5wbmc=/original/ry5r4c.png",
        "https://img.itch.zone/aW1hZ2UvMzk2NTc1OC8yMzY0Nzc3My5wbmc=/original/qlK6kD.png"
    ]
});

const SOCCERGEDDON = Object.freeze({
    TITLE: "Soccergeddon",
    ABOUT: `
    <b>How to Play</b>
    WASD or Arrow Keys - Move
    Left Click or Space - Kick ball when near it
    Right Click or E - Call ball to return to your locaiton
    Esc - Pause

    Soccergeddon is a mash-up between soccer and action rogue-lite games like Vampire Survivors. It was created in Godot 3 for ScoreJam #37 within a 2 day deadline. I joined the jam to challenge myself with handling all aspects of game development within an extremely tight deadline.

    The idea came from my love of action rogue-lite games and the theme of the Jam, which was soccer. I thought it would probably be satisfying to kick a ball into a crowd of enemies and watch them go flying as your score goes up, hence the game idea was born.

    I found this project incredibly difficult to manage due to the overwhelming amount of work required for a solo developer, especially within a 2 day time window. This project required me to code the mechanics, create the visual assets, and find appropriate music and sound effects. In addition to an opportunity to practice pixel art, because the project had required from different fields within a solo project, I found myself setting up the project in a way that allowed for easy incorporation of the assets once they were finished. For example, I knew I wanted different enemy variety, which required different sprites with their own animations depending on the enemy type, but I was nowhere close to finishing those sprites. To address this problem, I planned a standard animation list that all sprites will have, and setup a factory class that allowed for dragging and dropping the sprites for their corresponding enemy type. Setting it up like this was slow initially, but it ended up being a crucial step in development, as it streamlined the implementation of all of the assets when the deadline was extremely close. Overall, this game was an incredible learning opportunity in foundational setup and planning for these types of projects.
    `,
    IMAGES: [
        "https://img.itch.zone/aW1hZ2UvNDE0MTI2Ni8yNDY3OTAxMS5wbmc=/original/kuPrbR.png",
        "https://img.itch.zone/aW1hZ2UvNDE0MTI2Ni8yNDY3OTAxMi5wbmc=/original/fmXCu%2F.png",
        "https://img.itch.zone/aW1hZ2UvNDE0MTI2Ni8yNDY3OTAxMy5wbmc=/original/MACOR%2B.png"
    ],
    EMBED: `<iframe frameborder="0" src="https://itch.io/embed-upload/15923591?color=360185" width="1024" height="620"><a href="https://golden-rice.itch.io/soccergeddon">Play Soccergeddon on itch.io</a></iframe>`,
    EMBED_MOBILE_SUPPORT: false
});

const CONVERSATION_SIMULATOR = Object.freeze({
    TITLE: "Conversation Simulator",
    ABOUT: `
        <b>How to Play</b><br>
        Use the mouse to drag words into the boxes at the bottom. Try to form a coherent sentence with those words that makes sense within the context to progress.

        Conversation Simulator is a frantic puzzle word game, where you have to form a coherent sentences that make sense within the context of the situation. It was created in Godot 3 for the 20 Second Game Jam, where the goal was to create a game that can be played within 20 seconds. I joined this jam because it was an incredibly unique theme that demanded efficiency in teaching game mechanics, and what the game is all about.

        Both the idea and the name of the game came from the experience of trying to find the right words to say in a conversational setting. More specifically, I wanted to gamify the experience where you would run a conversation in your mind over and over again to make the perfect response. The premise is that you play as someone that has social anxiety, and your mother is trying to help you get over it by letting you order at a fast food restraunt. I felt that it was a heartwarming premise and the importance of which is downplayed a lot in online discussions, so I wanted to create a game to share that experience.

        This project was an opportunity for me to translate something from real world experience, into a tangible game mechanic that emulates the same feeling. For example, usually people struggle with their words in conversation because they are panicked, so I wanted the player to have that sense of feeling too. The jam's theme was perfect for eliciting said emotion, since people tend to panic when under a time crunch. To further sell the feeling of panic, I added increasing visual effects simiular to that of vertigo as the timer goes on, along with a tinnitus sound effect. The nature of the jam also gave me an opportunity to go outside my comfort zone and try something different in order to optimize the learning experience for the player. The main menu was a result of said optimization, before you're even able to play the game, you have to drag the Play button into empty box. This immediately tells the player how to play the game, since to even start the game in the first place they needed to drag the Play button into the empty box. Overall, this project was an incredible learning experience in implementing game design principles, and gave me an opportunity to step away from the technical aspect of game development and focus on the part that I had not put as much thought in.
    `,
    IMAGES: [
        "https://img.itch.zone/aW1hZ2UvNDEyMzY1MS8yNDU3MjM5NS5wbmc=/original/y0LFqc.png",
        "https://img.itch.zone/aW1hZ2UvNDEyMzY1MS8yNDU3MjM5My5wbmc=/original/GRZ9Qw.png",
        "https://img.itch.zone/aW1hZ2UvNDEyMzY1MS8yNDU3MjM5NC5wbmc=/original/9Dfexs.png"
    ],
    EMBED: `<iframe frameborder="0" src="https://itch.io/embed-upload/15855754?color=FF9013" width="1024" height="788"><a href="https://golden-rice.itch.io/conversation-simulator">Play Conversation Simulator on itch.io</a></iframe>`,
    EMBED_MOBILE_SUPPORT: true
});

const Projects = Object.freeze({
    TERRAIN_GENERATOR_SIMULATOR: TERRAIN_GENERATOR_SIMULATOR,
    DUCK_HUNT_AT_HOME: DUCK_HUNT_AT_HOME,
    PAWSITIVE: PAWSITIVE,
    SWING: SWING,
    TOUHOU_AT_HOME: TOUHOU_AT_HOME,
    ZOOM_TO_HOME: ZOOM_TO_HOME,
    SPIN_THE_BARREL: SPIN_THE_BARREL,
    AI_GAMER: AI_GAMER,
    PAINTED_REVERIE: PAINTED_REVERIE,
    SOCCERGEDDON: SOCCERGEDDON,
    CONVERSATION_SIMULATOR: CONVERSATION_SIMULATOR
});