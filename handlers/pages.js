const { folderMetadata, fetchPageContent, updatePageContent } = require('../service/pages');

const handleFolderMetadata = async function (req, res, next) {
    try {
        const location = req.query.location;
        res.json(folderMetadata(location));
    }
    catch (e) {
        next(e);
    }
}

const handleFetchPageContent = async function (req, res, next) {
    try {
        const name = req.query.name;
        res.json(fetchPageContent(name));
    }
    catch (e) {
        next(e);
    }
}

const handleUpdatePageContent = async function (req, res, next) {
    try {
        const name = req.query.name;
        const content = req.body.content;
        res.json(updatePageContent(name, content));
    }
    catch (e) {
        next(e);
    }
}

module.exports = {
    folderMetadata: handleFolderMetadata,
    fetchPageContent: handleFetchPageContent,
    updatePageContent: handleUpdatePageContent,
}