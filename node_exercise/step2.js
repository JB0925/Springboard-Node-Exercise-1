const { default: axios } = require('axios');
const fs = require('fs');

const cat = path => {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1)
        }
        console.log(data);
    });
};


async function webCat(url) {
    let response = await axios.get(url);
    console.log(response.data);
};


if (process.argv.length > 3) {
    console.log('You can only have one path');
    process.exit(1);
} else if (process.argv.length === 2) {
    console.log('You must supply a file path or a url');
    process.exit(1);
} else {
    const arg = process.argv[2];
    if (arg.includes('http')) {
        webCat(arg);
        return;
    };
    cat(arg);
};
