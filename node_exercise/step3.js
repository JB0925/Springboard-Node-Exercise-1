const { default: axios } = require('axios');
const fs = require('fs');

const cat = path => {
    const returnText = fs.readFileSync(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1)
        }
    });
    return returnText;
};


async function webCat(url) {
    let response = await axios.get(url);
    return response.data;
};


const writeToFile = (path, data) => {
    fs.writeFile(path, data, "utf8", (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        };
    });
};


const webCatWriteWrapper = (path, webData) => {
    webCat(webData)
    .then(data => writeToFile(path, data));
    return;
}


const writeOrPrintData = () => {
    args = process.argv;
    if (args.length === 3) {
        const arg = args[2];
        if (arg.includes('http')) {
            webCat(arg).then(data => console.log(data));
            return;
        };
        console.log(cat(arg));
    } else {
        const path = args[3];
        args[4].includes('http') ? webCatWriteWrapper(path, args[4]) : writeToFile(path, cat(args[4]));
    }
}


if (process.argv.length > 5) {
    console.log('Too many arguments.');
    process.exit(1);
} else if (process.argv.length === 2) {
    console.log('You must supply a file path or a url');
    process.exit(1);
} else {
    writeOrPrintData();
};