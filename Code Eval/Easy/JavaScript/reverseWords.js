var fs = require("fs");

fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line !== "") {
        var trimWord = function(word){ return word.toString().trim();};
        console.log(line.split(" ").map(trimWord).reverse().join(" "));
    }
});