const express = require('express');
const router = express.Router();
const Redis = require('ioredis');
const redis = new Redis(); // localhost:6379

// ADD SCORE - when user does something
// POST /leaderboard/add
// Body: { "user": "bhavesh", "points": 10 }
router.post('/leaderboard/add', async (req, res) => {
  const { user, points } = req.body;

  if (!user) return res.status(400).json({ error: 'user required' });

  const score = points || 1;

  // Add to sorted set - Redis auto sorts
  await redis.zincrby('live:leaderboard', score, user);

  // Publish update for live clients
  const top = await redis.zrevrange('live:leaderboard', 0, 9, 'WITHSCORES');
  await redis.publish('leaderboard:update', JSON.stringify(top));

  res.json({ message: `${user} +${score}`, leaderboard: top });
});

// GET LEADERBOARD - view top 10
// GET /leaderboard
router.get('/leaderboard', async (req, res) => {
  const start = Date.now();
  const data = await redis.zrevrange('live:leaderboard', 0, 9, 'WITHSCORES');
  const time = Date.now() - start;

  // Format nicely
  let leaderboard = [];
  for (let i = 0; i < data.length; i += 2) {
    leaderboard.push({ rank: i/2 + 1, user: data[i], score: data[i+1] });
  }

  res.json({
    leaderboard,
    count: leaderboard.length,
    redisTime: `${time}ms`
  });
});

// RESET - clear leaderboard for testing
// DELETE /leaderboard/reset
router.delete('/leaderboard/reset', async (req, res) => {
  await redis.del('live:leaderboard');
  res.json({ message: 'Leaderboard cleared' });
});

// LIVE UPDATES - SSE for real-time (optional but cool)
// GET /leaderboard/live
router.get('/leaderboard/live', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sub = new Redis();
  await sub.subscribe('leaderboard:update');

  sub.on('message', (channel, message) => {
    res.write(`data: ${message}\n\n`);
  });

  req.on('close', () => {
    sub.disconnect();
  });
});

module.exports = router;
