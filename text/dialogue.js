export { Dialogue }

const OPTIONS = Object.freeze({
    PROJECTS: "What projects has Jonathan worked on?",
    ABOUT_INTERESTS: "What are Jonathan's interests?",
    ABOUT_EDUCATION: "What is Jonathan's education?",
    ABOUT_SKILLS: "What are Jonathan's skills?",
});

const CLERK_INTRO = Object.freeze({
    INTRO: "Hi there! Welcome to Jonathan's personal website.",
    DESCRIPTION: "I'm here to answer any questions you may have about Jonathan.",
    PROMPT: "What would you like to know?",
    REPEAT_PROMPT: "Would you like to know anything else?"
});

const ABOUT_DIALOGUE = Object.freeze({
    INTERESTS: "Jonathan enjoys anything games related, from playing games to developing them.",
    INTERESTS_2: "Of course he also enjoys coding, I mean he's weird enough to create this arcade as a portfolio site.",
    EDUCATION: "Jonathan is currently progressing through BCIT's CST program.",
    EDUCATION_2: "He also has a bachelor's degree in Biology from SFU, for what that's worth.",
    SKILLS: "In terms of programming languages, Jonathan is proficient in Java, C#, C++, JavaScript, and Python.",
    SKILLS_2: "In terms of tools, Jonathan is proficient in Godot, Unity, GitHub, NodeJS",
    SKILLS_3: "Right now he is trying to learn Unreal Engine and Blender, but his computer is too terrible to run them.",
});

const PROJECTS_DIALOGUE = Object.freeze({
    INSTRUCTIONS_DESKTOP: "You can see his projects by pressing E when near the arcade cabinet",
    INSTRUCTRICTIONS_MOBILE: "You can see his projects by tapping the arcade cabinet",
});

const Dialogue = Object.freeze({
    OPTIONS: OPTIONS,
    CLERK_INTRO: CLERK_INTRO,
    ABOUT_DIALOGUE: ABOUT_DIALOGUE,
    PROJECTS_DIALOGUE: PROJECTS_DIALOGUE,
});