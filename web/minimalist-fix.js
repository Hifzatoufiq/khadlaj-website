const fs = require('fs');
let text = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// Fix grid gaps for all grid-3 to use gap:48 for breathing room
text = text.replace(/gridTemplateColumns:"repeat\(3,1fr\)",gap:(\d+)/g, 'gridTemplateColumns:"repeat(3,1fr)",gap:48');
text = text.replace(/gridTemplateColumns:"repeat\(3,1fr\)",gap: (\d+)/g, 'gridTemplateColumns:"repeat(3,1fr)",gap: 48');

// Change section background to pure white for minimalist feel
text = text.replace(/background:"#FAFAF8"/g, 'background:"#fff"');

// Fix the category pill design to be underline-only (minimalist)
text = text.replace(/background:activeCat===c\?"#000":"transparent",\s*color:activeCat===c\?"#fff":"#555"/g, 'background:"transparent",color:activeCat===c?"#000":"#777"');
text = text.replace(/borderBottom: activeCat===c \? "2px solid #000" : "2px solid transparent"/g, 'borderBottom: activeCat===c ? "1px solid #000" : "1px solid transparent"');

fs.writeFileSync('khadlaj-perfumes (1).jsx', text);
console.log('Fixed gaps, background, and pills for Minimalist vibe.');
