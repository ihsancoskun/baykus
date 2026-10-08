const fs = require('fs');

const RIGHT_CARDS = [];
let id = 0;

function add(x, y, rot, s = 1) {
    RIGHT_CARDS.push({ x, y, rot, s });
}

// 1. Center Eye (1 large card)
// Let's place it at x=80, y=-100
add(80, -100, 5, 1.6);

// 2. Eye Halo (6 cards circling the eye)
const r = 55;
for(let i=0; i<6; i++) {
    let angle = (i/6) * Math.PI * 2;
    // Don't place a card directly towards the center (x=0) to keep the face open
    if (i === 3) continue; // skip the one at PI (left)
    add(80 + Math.cos(angle)*r, -100 + Math.sin(angle)*r, (angle * 180/Math.PI) + 90, 0.8);
}

// 3. Ears (4 cards pointing up and out)
add(50, -200, 15);
add(80, -220, 25);
add(110, -240, 35);
add(140, -260, 45);

// 4. Beak (1 card pointing down-left)
add(20, -20, 35);

// 5. Body (V-shape, dense overlapping)
// Rows of cards moving down
add(30, 40, 5);
add(70, 40, 15);
add(110, 30, 25);

add(20, 90, 0);
add(60, 95, -5);
add(100, 85, -15);

add(20, 140, -5);
add(50, 150, -10);

add(20, 190, 0);
add(15, 240, 0); // Tail tip

// 6. Wings (3 layers fanning out)
// Layer 1 (Inner)
add(140, -30, -15);
add(135, 30, -25);
add(130, 90, -35);

// Layer 2 (Mid)
add(190, -50, -30);
add(195, 10, -40);
add(190, 70, -50);
add(180, 130, -60);

// Layer 3 (Outer)
add(250, -70, -45);
add(260, -10, -55);
add(260, 50, -65);

// 7. Feet (2 cards resting on branch)
add(40, 290, 10);
add(80, 290, -5);

// Create left side by mirroring
const LEFT_CARDS = RIGHT_CARDS.map(p => ({
    x: -p.x, y: p.y, rot: -p.rot, s: p.s
}));

// Combine
const owl = [
    // Move the 4 programs to the front of the array (The two big eyes, and the two inner chest cards)
    RIGHT_CARDS[0],
    LEFT_CARDS[0],
    RIGHT_CARDS[6], // inner chest
    LEFT_CARDS[6],
    
    // Remaining cards
    ...RIGHT_CARDS.slice(1, 6),
    ...RIGHT_CARDS.slice(7),
    ...LEFT_CARDS.slice(1, 6),
    ...LEFT_CARDS.slice(7),
];

console.log(`Total cards: ${owl.length}`);
fs.writeFileSync('owl_layout.json', JSON.stringify(owl, null, 4));
