// server.js or app.js
const express = require('express');
const app = express();
const footprintRoutes = require('./routes/footprintRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/footprint', footprintRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
