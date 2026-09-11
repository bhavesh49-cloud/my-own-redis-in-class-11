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

### Day 03: Site Banner API - Redis Strings

**Why a Banner needs Redis?**
Site banner is displayed on every page load. Fetching it from 
a primary DB (Postgres/Mongo) for every request adds unnecessary 
load and latency. Redis stores it in-memory for <5ms access.

**Implementation:**
- Key Design: `app:banner` (namespaced to avoid collision)
- Type Used: String - because banner is a single atomic value

**API & Redis Mapping:**
| API | Redis Command | Purpose |
| :--- | :--- | :--- |
| POST /banner | SET app:banner "msg" | Create/Update banner |
| GET /banner | GET app:banner | Fetch banner |
| DELETE /banner | DEL app:banner | Remove banner |
| GET /banner/exists | EXISTS app:banner | Check availability |

**What I Learned & Debugged:**
- Fixed `Invalid URL` by correcting Thunder Client URL format
- Fixed `Request Failed` (port 3000 not listening) - learned to ensure `npm run dev` is running
- `ioredis` vs `redis` client difference - using `ioredis` for better cluster support
- Duplicate import error in `index.js`

**Stack:** Node.js, Express 4.18.3, ioredis 5.4.1

**Test:**
```json
POST /banner
{ "message": "yokoso watasino soul society" }
→ { "success": true }

## Day 4 - OTP Verify with Redis EXPIRE ✅
- Used Redis to store OTP with 5 min TTL
- POST /otp/verify - 9ms latency
- Returns 200 OK on success

# Day 5- Redis: JSON vs Hash - User Profile Cache Benchmark

Why storing user profiles as STRING (JSON) vs (HASH) matters for real backend systems.

Built with Node.js + Express + ioredis.

### The Problem
When caching user profiles in Redis, most beginners do `SET user:123 JSON.stringify(user)`.
It works, but to update 1 field you have to GET full JSON, parse, update, SET again.

Is HSET user:123 name "x" email "y" better? Let's test.

### Tech Stack
- Node.js, Express
- Redis + ioredis
- Nodemon for dev

### API Endpoints
POST /user/:id/json  -> Save user as JSON string
GET  /user/:id/json  -> Get user from JSON stringPOST /user/:id/hash  -> Save user as Hash
GET  /user/:id/hash  -> Get user from Hash
}

# ⚡ Redis OTP Engine — 39ms Email Delivery

> Day 4 → Day 6 | 9 Days Building in Public | `void_systems`

**Live Demo:** `localhost:3000/emails/prcess-one`
**Final Performance:** **39ms Total** | TTFB 39ms | Download 0ms
**Started at:** 140ms | **Improved by:** 72% in 2 days

### The Story

Day 4: Built a queued OTP system — 140ms
Day 5: Optimized worker — 39ms
Day 6: Stable, production-ready, Email sent ✅

Proof from WebRequestKit (Rust-powered):

#  Redis Engine

> 9 Days Building in Public — Day 7/9 COMPLETED
> bhaveshcoder.in | void_systems

**Performance Today:** `POST /welcome-email → 105ms | TTFB 104ms`

> 9 Days Building in Public — Day 8/9 DONE, Day 9 tomorrow
> by Bhavesh | bhaveshcoder.in | void_systems

140ms → 9ms in 5 days. Redis from scratch.

### Performance

- Day 4: 140ms first queue
- Day 5: 39ms stable
- Day 7: 105ms welcome-email queued
- Day 8: 9ms OTP verify + Pub/Sub
- Day 9: Live Leaderboard — coming

### What I Built Till Day 8

1. Email Queue — welcome emails go to BullMQ queue, worker sends async
2. OTP Verify — 9ms verify from Redis memory
3. Notification Pub/Sub — one event published, many services notified instantly

### Day 9 — Live Leaderboard

What is it?
A live ranking board that updates in real-time. When a user verifies OTP, their score goes up and everyone sees the rank change instantly. Like a game leaderboard.

How it works in simple words:
- Every user has a score in Redis
- When they verify OTP, score +1
- Redis sorts all users by score automatically
- Pub/Sub pushes new leaderboard to everyone live

No refresh needed. Real-time.

This completes the system — Queue + 9ms + Pub/Sub + Live Leaderboard.

### Tech

Redis, BullMQ, Express

### Launch

Day 9 — bhaveshcoder.in/9ms

---
Built by Bhavesh — Day 8/9 Done

# 🚀 Day 9 — Live Leaderboard with Redis

## ✅ Day 9 Completed

Today I built a **Live Leaderboard system using Redis**.

The goal of this project was to understand how Redis can be used to store and update rankings in real time using **Sorted Sets**.

---

## 🏆 What I Built

A real-time leaderboard where players can:

* ➕ Add players and their scores
* 🔄 Update scores
* 📊 Automatically rank players
* 🥇 Get the top players
* 🔍 Check a player's rank
* ⚡ Get fast leaderboard results using Redis

---

## 🛠️ Technologies Used

* **Node.js**
* **Express.js**
* **Redis**
* **JavaScript**
* **Visual Studio Code**
* **REST API**

---

## 🧠 What I Learned

Today I learned how Redis **Sorted Sets (ZSETs)** can be used to build ranking systems.

Important Redis commands/concepts I worked with:

```text
ZADD
ZRANGE
ZREVRANGE
ZRANK
ZREVRANK
ZSCORE
```

The leaderboard stores players with their scores and Redis automatically keeps them ranked.

---

## 🔥 Example

A leaderboard could look like:

| Rank | Player   | Score |
| ---- | -------- | ----- |
| 🥇 1 | Player A | 950   |
| 🥈 2 | Player B | 850   |
| 🥉 3 | Player C | 720   |
| 4    | Player D | 650   |

When a player's score changes, the leaderboard updates automatically.

---

## 📡 API Examples

### Add / Update Score

```http
POST /leaderboard/score
```

Example request:

```json
{
  "player": "PlayerA",
  "score": 950
}
```

### Get Leaderboard

```http
GET /leaderboard
```

### Get Player Rank

```http
GET /leaderboard/rank/PlayerA
```

---

## 📁 Project Structure

```text
day-9-live-leaderboard/
│
├── src/
│   ├── server.js
│   ├── redis.js
│   └── leaderboard.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 🎯 Day 9 Goal

> **Build a live leaderboard using Redis and understand how Redis Sorted Sets can be used for high-performance ranking systems.**

### Status

✅ Redis connected
✅ Leaderboard created
✅ Player scores implemented
✅ Ranking implemented
✅ REST APIs implemented
✅ Tested successfully

---

## 📈 Challenge Progress

**Day 9 / 9 — COMPLETE 🎉**

```text
████████████████████ 100%
```

### 🔥 Day 9 Completed!

 



