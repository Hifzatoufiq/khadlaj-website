var fs = require("fs");
var lines = fs.readFileSync("khadlaj-perfumes (1).jsx","utf8").split("\n");
lines.forEach(function(l,i){
  if(l.includes("hero-img-wrap") || l.includes("TIKTOK") || l.includes("TikTok") || l.includes("bottleFloat") || l.includes("perf-bottle") || l.includes("Watch Us")){
    console.log((i+1)+": "+l.trim().substring(0,100));
  }
});
