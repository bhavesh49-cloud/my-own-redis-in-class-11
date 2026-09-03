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
<img width="1280" height="853" alt="WhatsApp Image 2026-09-03 at 5 11 12 PM" src="https://github.com/user-attachments/assets/1c6dd620-80a5-4d3d-86f3-cb298a91e9a2" />
<img width="1280" height="853" alt="WhatsApp Image 2026-09-03 at 5 11 13 PM" src="https://github.com/user-attachments/assets/767d4ecf-2dc1-40d6-ae47-82f4e44aae59" />
<img width="1280" height="853" alt="WhatsApp Image 2026-09-03 at 5 11 13 PM (1)" src="https://github.com/user-attachments/assets/f56a6e17-1450-424e-b1a3-93026f1f25c0" />
<img width="1280" height="853" alt="WhatsApp Image 2026-09-03 at 5 11 13 PM (2)" src="https://github.com/user-attachments/assets/8407d10e-5c35-4025-ac48-b18a26465f91" />

