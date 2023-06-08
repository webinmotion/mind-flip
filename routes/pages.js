const express = require('express');
const router = express.Router();
const { folderMetadata, fetchPageContent, updatePageContent } = require('../handlers/pages');

router.get('/', folderMetadata);

router.get('/1', fetchPageContent);

router.post('/', updatePageContent)

module.exports = router;
