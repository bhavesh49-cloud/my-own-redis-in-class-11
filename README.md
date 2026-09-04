# my-own-redis-in-class-11
# my-own-redis-in-class-11

## What I learned about Redis

### 1. In-Memory Store
Redis stores data in RAM, not disk. So it's FAST.
Backend App -> Redis (fast) -> if miss, go to MongoDB (truth source, slow)

### 2. Cache-Aside Pattern
User -> Node Server -> Redis
If cache hit = fast response
If miss = slow, get from DB and fill cache
Used by Swiggy, Zomato - Same data, hot data, fast response

### 3. 4 Use Cases
- OTP Store: OTP: 434343 TTL 3 min (auto delete)
- Rate Limiting: IP count 6, cooldown TTL 10 min
- Session Store: server A and server B share same Redis
- Job Queue: Redis List + Workers pulling

### 4. Important Note
IT IS NOT A SOLUTION FOR EVERY PROBLEM
Use for: Read pressure, Temp data expire, Shared counter, background jobs
TTL: t=0 -> t=90s -> t=180s invalid auto delete

## Day 1 Code
Simple in-memory key-value store in Python

## Day 2 - Setup Complete ✅

**What I built today:**
- Initialized Node.js project with `package.json`
- Setup Docker with MongoDB (27017) + My Redis Clone (6379)
- Connected MongoDB using Mongoose - connection successful
- Architecture implemented: `App -> My Redis (RAM) -> MongoDB (Disk)`

**How I tested:**
```bash
docker ps -> mongo running
npm run dev -> Server running on 3000
mongoose.connect() -> Connected to MongoDB
