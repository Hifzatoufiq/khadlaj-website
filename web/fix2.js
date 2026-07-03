var fs = require("fs");
var lines = fs.readFileSync("khadlaj-perfumes (1).jsx","utf8").split("\n");
lines.forEach(function(l,i){
  if(l.includes("video") && (l.includes("autoPlay") || l.includes("onyx") || l.includes("source src"))){
    console.log((i+1)+": "+l.trim().substring(0,120));
  }
});
