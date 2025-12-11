export const gameState = {
    rollDisabled: false,
    rollTimes: 2,
    isFlashing: false,
    activated2: false,
    activated3: true,
    activated5: false
};

// Save state to localStorage
export function saveState() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load state from localStorage
export function loadState() {
    const saved = localStorage.getItem('gameState');
    if (saved) {
        const loaded = JSON.parse(saved);
        Object.assign(gameState, loaded); // merge loaded data into gameState
    }
}