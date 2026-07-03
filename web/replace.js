const fs = require('fs');
let text = fs.readFileSync('khadlaj-perfumes (1).jsx', 'utf8');

// Replace all instances of grid-4 and 4-column repeats
text = text.replace(/gridTemplateColumns:"repeat\(4,1fr\)"/g, 'gridTemplateColumns:"repeat(3,1fr)"');
text = text.replace(/className="grid-4"/g, 'className="grid-3"');

fs.writeFileSync('khadlaj-perfumes (1).jsx', text);
console.log('Replaced successfully');
