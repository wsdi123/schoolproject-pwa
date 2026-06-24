const express = require('express');
const app = express();
const PORT = 3000;

// public map beschikbaar maken
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`✅ Server draait op http://localhost:${PORT}`);
});