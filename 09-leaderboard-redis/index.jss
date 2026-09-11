const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const leaderboardRoutes = require('./leaderboard');
app.use(leaderboardRoutes);

app.listen(3000, () => console.log('Server on 3000'));
