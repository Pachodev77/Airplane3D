const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Route for the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'airplane_3d_game.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Open your browser and navigate to http://localhost:${port}`);
});
