var fs = require("fs");
var src = fs.readFileSync("khadlaj-perfumes (1).jsx", "utf8");

// Replace the long video filename with the simple one
var idx = src.indexOf('<source src="./video/Onyx Silver');
if(idx !== -1) {
  var endIdx = src.indexOf('"/>', idx) + 3;
  var oldTag = src.substring(idx, endIdx);
  console.log("Replacing:", oldTag);
  src = src.substring(0, idx) + '<source src="./video/onyx-silver.mp4" type="video/mp4"/>' + src.substring(endIdx);
  fs.writeFileSync("khadlaj-perfumes (1).jsx", src);
  console.log("Fixed!");
} else {
  console.log("Tag not found");
}
