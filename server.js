const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve all static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running!`);
    console.log(`➡️  Open your browser and go to: http://localhost:${PORT}`);
});