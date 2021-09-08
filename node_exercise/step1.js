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

if (process.argv.length > 3) {
    console.log('You can only have one path')
    process.exit(1)
};

cat(process.argv[2]);