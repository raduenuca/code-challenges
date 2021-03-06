(function() {
    var fs = require("fs");

    var curry = function(func) {
        var initialArgs = [].slice.apply(arguments, [1]);
        var funcArgsLength = func.length;

        var curried = function(args) {
            if (args.length >= funcArgsLength) {
                return func.apply(null, args);
            }

            return function() {
                return curried(args.concat([].slice.apply(arguments)));
            };
        };

        return curried(initialArgs);
    };

    var joinArray = function(chr, array) {
        return array.join(chr);
    };

    var splitArray = function(chr, array) {
        return array.split(chr);
    };

    var lines = curry(splitArray, "\n");
    var unlines = curry(joinArray, "\n");

    var sentences = [];

    var computeLetterCasePercentage = function(str){
        var percentage = str.split("")
            .reduce(function(acc, letter) {
            if (letter.toLowerCase() === letter) {
                acc[0] = acc[0] + 1;

            }
            else {
                acc[1] = acc[1] + 1;
            }

            return acc;
        }, [0, 0]);
        
        var lowercase = percentage[0];
        var uppercase = percentage[1];
        var strLength = lowercase + uppercase;

        sentences.push("lowercase: " +
            parseFloat((lowercase / strLength) * 100).toFixed(2) +
            " uppercase: " +
            parseFloat((uppercase / strLength) * 100).toFixed(2));
    };

    lines(fs.readFileSync(process.argv[2]).toString())
        .forEach(computeLetterCasePercentage);

    console.log(unlines(sentences));
}());