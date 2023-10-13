const path = require('path');
const dotenv = require('dotenv');
const mode = process.env.NODE_ENV?.trim();

module.exports = () => {
    console.log(`application starting in '${mode}' mode`);

    if (mode === 'development') {
        dotenv.config({ path: path.join(process.cwd(), '.env.local') });
    }
}

