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
    ABOUT: `<b>How to Play</b>
WASD or Arrow Keys - Move
Left Click or Space - Kick ball when near it
Right Click or E - Call ball to return to your locaiton
Esc - Pause

<b>About</b>
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
    ABOUT: `<b>How to Play</b>
Use the mouse to drag words into the boxes at the bottom. Try to form a coherent sentence with those words that makes sense within the context to progress.

<b>About</b>
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
    EMBED_MOBILE_SUPPORT: false
});

const ENVOY = Object.freeze({
    TITLE: "Envoy",
    ABOUT: `<b>How to Play</b>
Use the WASD keys to move around your character, aim the flashlight with your mouse. Follow the tutorial in the beginning to get the basics on how to play.

<b>About</b>
    Envoy is top-down horror survival game where the goal is to figure out the history of the lab you find yourself in. It was created with Godot 4.6 using GDScript so that the project can be exported to be playable on browser. The project was created in a group made for Noise Jam 3, where the theme of the jam was applying noise to your game in some way. Our team decided to apply noise to our graphics, hence the grainy VHS-like aesthetics of the game.

    The name came from the theme requirement of the jam, which we had to incorporate angels into our game. Our team knew we wanted to create a horror game for this jam, so the idea of using biblically accurate angels as the monsters of the game seemed very fitting. We drafted an entire story where the main theme is humanity's hubris in the exploitation of power when given the opportunity to do so. We also came up with elaborate backstories for all of the monsters in our game, with the common theme of sterile experimentation.

    This project was an opportunity to use a different language while still working within the workspace of something familiar, that being the Godot engine. All my previous projects up to this project were all made in C#, even downgrading to Godot 3 in order to still work in C# for the sake of exporting to web. During the beginning stages of this project, I did initially find the transition rather jarring. Particularly, I was not used to the GDScript's python-like syntax and its style of OOP. However, I quickly got used to the language peculiarities and it eventually became second nature like how C# originally was for me. It quickly became obvious that while what I wrote was somewhat different, my thought processes in how to design classes and their interactions did not change. This project gave me an opportunity to step outside my comfort zone and become used to adapting to new languages, it was a great learning experience and an eye opening moment that different languages does not necessarily mean different ways of approaching problems.
    `,
    IMAGES: [
        "https://img.itch.zone/aW1hZ2UvNDY3MTc3NC8yNzg0MTEyMi5wbmc=/347x500/Cyl4J8.png",
        "https://img.itch.zone/aW1hZ2UvNDY3MTc3NC8yNzg0MTEyNi5wbmc=/347x500/koJA63.png",
        "https://img.itch.zone/aW1hZ2UvNDY3MTc3NC8yNzg0MTExOS5wbmc=/347x500/NHhcGA.png"
    ],
    EMBED: `<iframe frameborder="0" src="https://itch.io/embed-upload/17913031?color=20201b" allowfullscreen="" width="1152" height="668"><a href="https://golden-rice.itch.io/envoy">Play Envoy on itch.io</a></iframe>`,
    EMBED_MOBILE_SUPPORT: false
});

const AQUARIMENT = Object.freeze({
    TITLE: "Aquariment",
    ABOUT: `<b>How to Play</b>
Click on the top hotbar to spawn fish into the tank, click on the screen to drop food to feed said fish. Click on the coins that the fish drop to get money, and use the money to buy upgrades in the upgrade menu that can be accessed through the top hotbar with the 2 up arrows icon.

<b>About</b>
    Aquariment is an incremental game inspired by the likes of Insaniquarium created by PopCap Games back in 2006. An incremental game is one in which your progress scales exponentially as you progress further in an upgrade tree, while your obstacle also scales exponentially. It was a solo project created in Godot 4.6 for Comfy Jam: Summer 2026, and was created from scratch in the span of 4 days, though the music, art, and sound effect assets were created by others found from various open art sites such as OpenGameArt.org

    The name came from the combination of the words "Incremental" and "Aquarium". Prior to this project, I had always wanted to try creating an incremental game, given they were a genre of games I was particularly fond of. Simultaneously, I grew up playing Insaniquarium in my childhood and I wanted to see if I could recreate the mechanics of that game. Naturally the idea of combining the two inspirations came about from those desires, and I felt that taking care of and watching over fish was a rather cozy activity, so it felt like a natural fit with the theme of the jam.

    This project gave me the opportunity to work with assets that don't necessarily perfectly fit my requirements. Before this, I tended to create my own art assets through drawing my own pixel art since my own art usually has a cohesive style to them since they were all drawn by me. However, due to the tight deadline of the jam, this was not an option since it would take too much time to create everything from scratch. This gave me a unique opportunity to focus solely on the coding aspect of the game, and structure the code in a way that allowed for easy slotting of any game assets I might change. The way I created classes changed, where I changed classes to rely on exported Godot resources, and each resource was standardized to allow for easy swapping between different assets. It also made me extremely conscientious about separating game logic from visuals, where sprite visuals was managed by a dedicated class that read the state of the class responsible for the logic.
    `,
    IMAGES: [
        "https://img.itch.zone/aW1hZ2UvNDY5MzY2Ni8yNzk3MTg2Ni5wbmc=/347x500/l96ODy.png",
        "https://img.itch.zone/aW1hZ2UvNDY5MzY2Ni8yNzk3MTg2NS5wbmc=/347x500/aqyBUm.png",
        "https://img.itch.zone/aW1hZ2UvNDY5MzY2Ni8yNzk3MTg2Ny5wbmc=/347x500/1b5mzP.png",
        "https://img.itch.zone/aW1hZ2UvNDY5MzY2Ni8yNzk3MTg2NC5wbmc=/347x500/CY%2FbJE.png"
    ],
    EMBED: `<iframe frameborder="0" src="https://itch.io/embed-upload/17996657?color=000000" allowfullscreen="" width="1152" height="668"><a href="https://golden-rice.itch.io/aquariment">Play Aquariment on itch.io</a></iframe>`,
    EMBED_MOBILE_SUPPORT: false
});

const Projects = Object.freeze({
    ENVOY: ENVOY,
    DUCK_HUNT_AT_HOME: DUCK_HUNT_AT_HOME,
    PAWSITIVE: PAWSITIVE,
    SWING: SWING,
    TOUHOU_AT_HOME: TOUHOU_AT_HOME,
    ZOOM_TO_HOME: ZOOM_TO_HOME,
    SPIN_THE_BARREL: SPIN_THE_BARREL,
    AI_GAMER: AI_GAMER,
    PAINTED_REVERIE: PAINTED_REVERIE,
    SOCCERGEDDON: SOCCERGEDDON,
    CONVERSATION_SIMULATOR: CONVERSATION_SIMULATOR,
    AQUARIMENT: AQUARIMENT
});