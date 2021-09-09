/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require("./markov");
const fs = require("fs");
const axios = require("axios");


// read from a file, instantiate a new MarkovMachine instance,
// and call makeText on the output from the call to readFileSync.
const readFromFile = path => {
    const text = fs.readFileSync(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1);
        };
    });
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
    return;
};

// Same as above, but this time using a URL and Axios
// instead of a file. Includes error handling for incorrect URLs.
const readFromURL = async(url) => {
    try {
        let response = await axios.get(url);
        let text = response.data;
        let mm = new MarkovMachine(text);
        console.log(mm.makeText());
    return;
    } catch(err) {
        console.log(err);
        console.log("Sorry, an error occurred.")
    };
};

// Used to determine if the user has passed in "file"
// or "url", which will then determine which of the above methods
// is called.
const determineIfFileOrURL = (type, filePath) => {
    if (type.toLowerCase() === 'file') {
        readFromFile(filePath);
        return;
    };
    readFromURL(filePath);
};

// Error handling for command line instances with too few or too many arguments.
if (process.argv.length !== 4 ) {
    let msg = process.argv.length < 4 ? "Too few arguments." : "Too many arguments.";
    console.log(msg);
    process.exit(1);
}

//collecting the args for the "determineIfFileOrURL"
//function, and then calling the function.
let type = process.argv[2];
let filePath = process.argv[3];
determineIfFileOrURL(type, filePath);

