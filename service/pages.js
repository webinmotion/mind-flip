const fs = require('fs');
const path = require('path');

function folderMetadata(location) {
    var files = fs.readdirSync(path.resolve(process.cwd(), location));
    var regex = /(\d{1,2}_\d{1,2}_\d{4})-(\d{1,2}_\d{1,2})_(AM|PM)-(.*)$/
    return files.reduce((acc, file) => {
        if (!regex.test(file)) {
            throw Error(`${file} - expected file name with pattern <date>-<time>-<name>`)
        }
        var [_, date, time, ampm, name] = file.match(regex);
        acc[file] = { date, time, ampm, name }
        return acc;
    }, {});
}

function fetchPageContent(name) {
    return fs.readFileSync(name, { encoding: 'utf8', flag: 'r' });
}

function updatePageContent(name, content) {
    const length = Buffer.byteLength(content, 'utf8');
    const data = Buffer.alloc(length, content, 'utf8');
    fs.writeFileSync(name, data);
    console.log(`${name}: file updated`);
    return length;
}

module.exports = {
    folderMetadata,
    fetchPageContent,
    updatePageContent,
}