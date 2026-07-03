var fs = require("fs");
var path = require("path");

var videoDir = "video";
var files = fs.readdirSync(videoDir);
console.log("Files found:", files);

// Copy first mp4 to simple name
var mp4 = files.find(function(f){ return f.endsWith(".mp4"); });
if(mp4){
  fs.copyFileSync(path.join(videoDir, mp4), path.join(videoDir, "onyx-silver.mp4"));
  console.log("Copied to onyx-silver.mp4");
} else {
  console.log("No mp4 found");
}
