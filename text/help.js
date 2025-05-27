export { InstructionsHTML as Instructions }

const wasdIcon = `<img class="help-text-icon help-icon-enlarge" src="../images/icons/wasd-icon.png" alt="WASD">`;
const eIcon = `<img class="help-text-icon" src="../images/icons/e-icon.png" alt="E">`;
const shiftIcon = `<img class="help-text-icon" src="../images/icons/shift-icon.png" alt="Shift">`;
const tapIcon = `<img class=help-text-icon src="../images/icons/tap-icon.png" alt="tap">`;

const instructionsMobile = `
${tapIcon} or drag to move.
${tapIcon} on arcade machines or the arcade clerk when in front of them to interact.
`.trim();

const instructionsPC = `
Press ${wasdIcon} to move, hold ${shiftIcon} (shift) while moving to run.
Press ${eIcon} when in front of an arcade machine or the arcade clerk to interact with them.
`.trim();

const InstructionsHTML = `
<p class="help-text">Welcome to Jonathan's Project Arcade, below are the controls to move and interact with the world.</p><br>
<b class="help-text help-section">Mobile Controls</b><br>
<p class="help-text">${instructionsMobile}</p><br>
<b class="help-text help-section">PC Controls</b><br>
<p class="help-text">${instructionsPC}</p>
`.trim();
